package auth

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strings"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	service *SpotifyAuthService
}

func NewAuthHandler(service *SpotifyAuthService) *AuthHandler {
	return &AuthHandler{
		service: service,
	}
}

func (h *AuthHandler) RegisterRoutes(r *gin.Engine) {
	// Public auth routes
	auth := r.Group("/auth")
	{
		auth.GET("/login", h.Login)
		auth.GET("/callback", h.Callback)
		auth.GET("/refresh", h.RefreshToken)
	}
}

// Login initiates the Spotify OAuth flow
func (h *AuthHandler) Login(c *gin.Context) {
	url, state, err := h.service.GetAuthURL()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate auth URL"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"login_url": url,
		"state":     state,
	})
}

func (h *AuthHandler) Callback(c *gin.Context) {
	code := c.Query("code")
	state := c.Query("state")
	redirectURL := c.Query("redirect_uri")

	if code == "" {
		if errMsg := c.Query("error"); errMsg != "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": errMsg})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing authorization code"})
		return
	}

	// if !h.service.ValidateState(state) {
	// 	c.JSON(400, gin.H{"error": "Invalid state parameter"})
	// 	return
	// }

	token, user, err := h.service.Exchange(c, code, state)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	jwtToken, err := h.service.GenerateJWT(user, token)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	frontendURL := "http://localhost:3000/auth/callback"
	if redirectURL != "" {
		frontendURL = redirectURL
	}

	frontendURL += "?token=" + jwtToken + "&user=" + encodeUserToJSON(user)

	c.Redirect(http.StatusTemporaryRedirect, frontendURL)
	// c.JSON(200, gin.H{
	// 	"token": jwtToken,
	// 	"user":  user,
	// })
}

func encodeUserToJSON(user *User) string {
	jsonBytes, err := json.Marshal(user)
	if err != nil {
		return ""
	}
	return url.QueryEscape(string(jsonBytes))
}

func (h *AuthHandler) RefreshToken(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
		return
	}

	tokenParts := strings.Split(authHeader, " ")
	if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization format"})
		return
	}
	jwtToken := tokenParts[1]

	claims, err := h.service.ParseAndValidateJWT(jwtToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	refreshToken, ok := claims["refresh_token"].(string)
	if !ok || refreshToken == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No refresh token available"})
		return
	}

	newToken, err := h.service.RefreshSpotifyToken(c, refreshToken)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to refresh token"})
		return
	}

	user := &User{
		ID:           claims["sub"].(string),
		DisplayName:  claims["name"].(string),
		Email:        claims["email"].(string),
		ProfileImage: claims["profile_image"].(string),
	}

	newJWT, err := h.service.GenerateJWT(user, newToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate new token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": newJWT,
	})
}

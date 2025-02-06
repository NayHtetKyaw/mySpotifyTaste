package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"

	"auth-service/pkg/jwt"
	"auth-service/pkg/spotify"
)

type AuthHandler struct {
	spotifyAuth *spotify.SpotifyAuth
	jwtService  *jwt.JWTService
	redisClient *redis.Client
}

func NewAuthHandler(spotifyAuth *spotify.SpotifyAuth, jwtService *jwt.JWTService, redisClient *redis.Client) *AuthHandler {
	return &AuthHandler{
		spotifyAuth: spotifyAuth,
		jwtService:  jwtService,
		redisClient: redisClient,
	}
}

func (h *AuthHandler) HandleLogin(c *gin.Context) {
	authURL := h.spotifyAuth.GetAuthURL("state")
	c.Redirect(http.StatusFound, authURL)
}

func (h *AuthHandler) HandleCallback(c *gin.Context) {
	code := c.Query("code")
	token, err := h.spotifyAuth.ExchangeCode(c.Request.Context(), code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to exchange code"})
		return
	}

	// Store token in Redis
	userID := "spotify-user-id" // Replace with actual user ID from Spotify
	h.redisClient.Set(c.Request.Context(), "spotify:token:"+userID, token, 0)

	// Generate JWT
	jwtToken, err := h.jwtService.GenerateToken(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": jwtToken})
}

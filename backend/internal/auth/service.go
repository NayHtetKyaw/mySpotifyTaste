package auth

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
	"golang.org/x/oauth2"
)

type User struct {
	ID           string `json:"id"`
	DisplayName  string `json:"display_name"`
	Email        string `json:"email"`
	ProfileImage string `json:"profile_image"`
}

type SpotifyAuthService struct {
	authenticator *spotifyauth.Authenticator
	jwtSecret     []byte
	stateStore    map[string]time.Time
}

func NewSpotifyAuthService(clientID, clientSecret, redirectURL, jwtSecret string) *SpotifyAuthService {
	auth := spotifyauth.New(
		spotifyauth.WithClientID(clientID),
		spotifyauth.WithClientSecret(clientSecret),
		spotifyauth.WithRedirectURL(redirectURL),
		spotifyauth.WithScopes(
			spotifyauth.ScopeUserReadPrivate,
			spotifyauth.ScopeUserReadEmail,
			spotifyauth.ScopeUserReadCurrentlyPlaying,
			spotifyauth.ScopeUserLibraryRead,
			spotifyauth.ScopePlaylistReadPrivate,
			spotifyauth.ScopeUserTopRead,
			spotifyauth.ScopeUserReadRecentlyPlayed,
		),
	)

	return &SpotifyAuthService{
		authenticator: auth,
		jwtSecret:     []byte(jwtSecret),
		stateStore:    make(map[string]time.Time),
	}
}

func (s *SpotifyAuthService) GetAuthURL() (string, string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", "", err
	}
	state := base64.URLEncoding.EncodeToString(b)
	s.stateStore[state] = time.Now().Add(15 * time.Minute)
	url := s.authenticator.AuthURL(state)
	return url, state, nil
}

// ValidateState checks if the state is valid and not expired
func (s *SpotifyAuthService) ValidateState(state string) bool {
	expiryTime, exists := s.stateStore[state]
	if !exists {
		return false
	}
	if time.Now().After(expiryTime) {
		delete(s.stateStore, state)
		return false
	}
	delete(s.stateStore, state)
	return true
}

// Exchange exchanges the auth code for tokens and gets user info
func (s *SpotifyAuthService) Exchange(ctx context.Context, code, state string) (*oauth2.Token, *User, error) {
	if !s.ValidateState(state) {
		return nil, nil, errors.New("invalid or expired state")
	}

	token, err := s.authenticator.Exchange(ctx, code)
	if err != nil {
		return nil, nil, err
	}

	httpClient := s.authenticator.Client(ctx, token)
	client := spotify.New(httpClient)
	spotifyUser, err := client.CurrentUser(ctx)
	if err != nil {
		return nil, nil, err
	}

	profileImage := ""
	if len(spotifyUser.Images) > 0 {
		largestImage := spotifyUser.Images[1]
		for _, img := range spotifyUser.Images {
			if img.Width > largestImage.Width {
				largestImage = img
			}
		}
		profileImage = largestImage.URL
	}

	user := &User{
		ID:           spotifyUser.ID,
		DisplayName:  spotifyUser.DisplayName,
		Email:        spotifyUser.Email,
		ProfileImage: profileImage,
	}
	return token, user, nil
}

func (s *SpotifyAuthService) GenerateJWT(user *User, spotifyToken *oauth2.Token) (string, error) {
	expiresAt := time.Now().Add(time.Hour)
	if !spotifyToken.Expiry.IsZero() {
		expiresAt = spotifyToken.Expiry
	}
	claims := jwt.MapClaims{
		"sub":           user.ID,
		"name":          user.DisplayName,
		"email":         user.Email,
		"profile_image": user.ProfileImage,
		"spotify_token": spotifyToken.AccessToken,
		"refresh_token": spotifyToken.RefreshToken,
		"exp":           expiresAt.Unix(),
		"iat":           time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(s.jwtSecret)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// RefreshSpotifyToken refreshes the Spotify access token
func (s *SpotifyAuthService) RefreshSpotifyToken(ctx context.Context, refreshToken string) (*oauth2.Token, error) {
	token := &oauth2.Token{
		RefreshToken: refreshToken,
	}
	newToken, err := s.authenticator.RefreshToken(ctx, token)
	if err != nil {
		return nil, err
	}
	return newToken, nil
}

// ParseAndValidateJWT parses and validates a JWT token
func (s *SpotifyAuthService) ParseAndValidateJWT(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return s.jwtSecret, nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}
	return nil, errors.New("invalid token")
}

package main

import (
	"fmt"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
)

func main() {
	r := gin.Default()

	// Spotify OAuth2 Config
	auth := spotifyauth.New(
		spotifyauth.WithClientID(os.Getenv("SPOTIFY_CLIENT_ID")),
		spotifyauth.WithClientSecret(os.Getenv("SPOTIFY_CLIENT_SECRET")),
		spotifyauth.WithRedirectURL(os.Getenv("SPOTIFY_REDIRECT_URI")),
		spotifyauth.WithScopes(
			spotifyauth.ScopeUserReadPrivate,
			spotifyauth.ScopeUserReadRecentlyPlayed,
			spotifyauth.ScopeUserTopRead,
		),
	)

	// Endpoints
	r.GET("/auth/login", handleSpotifyLogin(auth))
	r.GET("/auth/callback", handleSpotifyCallback(auth))

	r.Run(":8081")
}

func handleSpotifyCallback(c *gin.Context) {
	// Exchange code for token
	token, err := auth.Exchange(c.Request.Context(), code)

	// Generate JWT
	jwtToken := jwt.GenerateToken(userID)

	// Store token in Redis
	redisClient.Set(c, fmt.Sprintf("spotify:token:%s", userID), token, 1*time.Hour)

	// Return JWT to client
	c.JSON(200, gin.H{"token": jwtToken})
}

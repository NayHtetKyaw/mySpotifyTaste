package handlers

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

var (
	spotifyOauthConfig = &oauth2.Config{
		ClientID:     os.Getenv("SPOTIFY_CLIENT_ID"),
		ClientSecret: os.Getenv("SPOTIFY_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("SPOTIFY_REDIRECT_URL"),
		Scopes: []string{
			"user-read-private",
			"user-read-email",
			"user-top-read",
			"user-read-recently-played",
			"user-read-currently-played",
			"user-library-read",
			"user-follow-read",
			"playlist-read-private",
			"user-read-playback-state",
			"user-read-playback-position",
		},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://accounts.spotify.com/authorize",
			TokenURL: "https://accounts.spotify.com/api/token",
		},
	}
)

func handleSpotifyLogin(c *gin.Context) {
	url := spotifyOauthConfig.AuthCodeURL("state")
	c.JSON(http.StatusOK, gin.H{"loginUrl", url})
}

func handleSpotifyCallback(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "There is no code provided"})
		return
	}

	token, err := spotifyOauthConfig.Exchange(c, code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to exchange token"})
		return
	}

	frontendURL := os.Getenv("FRONTEND_URL")
	c.Redirect(http.StatusTemporaryRedirect, frontendURL+"/home?access_token="+token.AccessToken)
}

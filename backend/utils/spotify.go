package utils

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

// SpotifyConfig holds all necessary Spotify credentials
type SpotifyConfig struct {
	ClientID     string
	ClientSecret string
	RedirectURI  string
}

// SpotifyOauthConfig is the global OAuth2 config instance
var SpotifyOauthConfig *oauth2.Config

// ValidateSpotifyConfig checks if all required environment variables are set
func ValidateSpotifyConfig() (*SpotifyConfig, error) {
	config := &SpotifyConfig{
		ClientID:     os.Getenv("SPOTIFY_CLIENT_ID"),
		ClientSecret: os.Getenv("SPOTIFY_CLIENT_SECRET"),
		RedirectURI:  os.Getenv("SPOTIFY_REDIRECT_URI"),
	}

	// Check if any required fields are empty
	if config.ClientID == "" {
		return nil, fmt.Errorf("SPOTIFY_CLIENT_ID environment variable is not set")
	}
	if config.ClientSecret == "" {
		return nil, fmt.Errorf("SPOTIFY_CLIENT_SECRET environment variable is not set")
	}
	if config.RedirectURI == "" {
		return nil, fmt.Errorf("SPOTIFY_REDIRECT_URI environment variable is not set")
	}

	return config, nil
}

// InitializeSpotifyOAuth sets up the OAuth config after validation
func InitializeSpotifyOAuth() error {
	config, err := ValidateSpotifyConfig()
	if err != nil {
		return fmt.Errorf("failed to validate Spotify configuration: %w", err)
	}

	SpotifyOauthConfig = &oauth2.Config{
		ClientID:     config.ClientID,
		ClientSecret: config.ClientSecret,
		RedirectURL:  config.RedirectURI,
		Scopes: []string{
			"user-read-private",         // Read access to user's subscription details
			"user-top-read",             // Read access to user's top artists and tracks
			"user-read-recently-played", // Read access to user's recently played tracks
		},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://accounts.spotify.com/authorize",
			TokenURL: "https://accounts.spotify.com/api/token",
		},
	}

	log.Printf("Spotify OAuth configuration initialized successfully")
	return nil
}

// GetSpotifyClient creates an HTTP client with the access token
func GetSpotifyClient(token string) *http.Client {
	return &http.Client{
		Transport: &oauth2.Transport{
			Source: oauth2.StaticTokenSource(
				&oauth2.Token{AccessToken: token},
			),
		},
	}
}

func HandleDebugScopes(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"scopes":  SpotifyOauthConfig.Scopes,
		"authURL": SpotifyOauthConfig.AuthCodeURL("state"),
	})
}

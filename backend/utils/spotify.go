package utils

import (
	"net/http"
	"os"

	"golang.org/x/oauth2"
)

// SpotifyConfig holds the OAuth2 configuration for Spotify
var SpotifyOauthConfig = &oauth2.Config{
	ClientID:     os.Getenv("SPOTIFY_CLIENT_ID"),
	ClientSecret: os.Getenv("SPOTIFY_CLIENT_SECRET"),
	RedirectURL:  os.Getenv("SPOTIFY_REDIRECT_URI"),
	Scopes: []string{
		"user-read-private",
		"user-read-email",
		"user-top-read",
		"user-read-recently-played",
		"user-read-currently-played",
	},
	Endpoint: oauth2.Endpoint{
		AuthURL:  "https://accounts.spotify.com/authorize",
		TokenURL: "https://accounts.spotify.com/api/token",
	},
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

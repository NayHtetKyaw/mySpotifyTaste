package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"spotify-backend/utils"

	"github.com/gin-gonic/gin"
)

func HandleSpotifyLogin(c *gin.Context) {
	url := utils.SpotifyOauthConfig.AuthCodeURL("state")
	c.JSON(http.StatusOK, gin.H{"loginUrl": url})
}

func HandleSpotifyCallback(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No code provided"})
		return
	}

	token, err := utils.SpotifyOauthConfig.Exchange(c, code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to exchange token"})
		return
	}

	frontendURL := os.Getenv("FRONTEND_URL")
	c.Redirect(http.StatusTemporaryRedirect,
		frontendURL+"/home?access_token="+token.AccessToken)
}

func HandleTopArtists(c *gin.Context) {
	token := c.GetString("access_token")
	client := utils.GetSpotifyClient(token)

	response, err := client.Get("https://api.spotify.com/v1/me/top/artists")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer response.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(response.Body).Decode(&result)
	c.JSON(http.StatusOK, result)
}

func HandleTopTracks(c *gin.Context) {
	token := c.GetString("access_token")
	client := utils.GetSpotifyClient(token)

	response, err := client.Get("https://api.spotify.com/v1/me/top/tracks")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer response.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(response.Body).Decode(&result)
	c.JSON(http.StatusOK, result)
}

func HandleUserProfile(c *gin.Context) {
	token := c.GetString("access_token")
	client := utils.GetSpotifyClient(token)

	response, err := client.Get("https://api.spotify.com/v1/me")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer response.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(response.Body).Decode(&result)
	c.JSON(http.StatusOK, result)
}

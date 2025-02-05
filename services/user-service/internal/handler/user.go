package handler

import "github.com/gin-gonic/gin"

func GetUserProfile(c *gin.Context) {
	// Get JWT from header
	userID := c.GetString("userID")

	// Get Spotify client
	client := spotifyclient.NewClient(userID)

	// Fetch data
	profile, _ := client.CurrentUser(c)
	currentlyPlaying, _ := client.PlayerCurrentlyPlaying(c)

	c.JSON(200, gin.H{
		"profile": gin.H{
			"id":           profile.ID,
			"display_name": profile.DisplayName,
			"followers":    profile.Followers.Count,
			"image":        profile.Images[0].URL,
			"url":          profile.ExternalURLs["spotify"],
		},
		"currently_playing": currentlyPlaying.Item.Name,
	})
}

package main

import (
	"github.com/gin-gonic/gin"
	"github.com/zmb3/spotify/v2"
)

func GetTopTracks(c *gin.Context) {
	timeRange := c.Query("range") // short/medium/long
	limit := c.DefaultQuery("limit", "10")

	client := spotifyclient.NewClient(c.GetString("userID"))

	tracks, _ := client.CurrentUsersTopTracksWithRange(
		c,
		spotify.Range(timeRange),
	)

	// Process and paginate
	result := processTracks(tracks, limit)

	c.JSON(200, result)
}

func GetTotalPlayedHours(c *gin.Context) {
	// Get from Kafka-processed data
	hours := database.GetPlayedHours(c.GetString("userID"))
	c.JSON(200, gin.H{"hours": hours})
}

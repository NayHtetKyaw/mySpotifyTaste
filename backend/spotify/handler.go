package spotify

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		service: service,
	}
}

// RegisterRoutes registers the Spotify routes with the provided router
func (h *Handler) RegisterRoutes(r *gin.RouterGroup) {
	spotify := r.Group("/spotify")
	{
		spotify.GET("/now-playing", h.GetCurrentlyPlaying)
		spotify.GET("/top-tracks", h.GetTopTracks)
		spotify.GET("/top-artists", h.GetTopArtists)
		spotify.GET("/recently-played", h.GetRecentlyPlayed)
	}
}

// GetCurrentlyPlaying gets the user's currently playing track
func (h *Handler) GetCurrentlyPlaying(c *gin.Context) {
	token, exists := c.Get("spotify_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No Spotify token available"})
		return
	}

	currentlyPlaying, err := h.service.GetCurrentlyPlaying(c, token.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get currently playing track"})
		return
	}

	if currentlyPlaying == nil || !currentlyPlaying.Playing {
		c.JSON(http.StatusOK, gin.H{"playing": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"playing":     true,
		"track":       currentlyPlaying.Item,
		"progress_ms": currentlyPlaying.Progress,
	})
}

// GetTopTracks gets the user's top tracks
func (h *Handler) GetTopTracks(c *gin.Context) {
	token, exists := c.Get("spotify_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No Spotify token available"})
		return
	}

	timeRange := c.DefaultQuery("time_range", "medium_term")
	limitStr := c.DefaultQuery("limit", "20")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 || limit > 50 {
		limit = 20 // Default limit
	}

	tracks, err := h.service.GetTopTracks(c, token.(string), timeRange, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get top tracks"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"tracks": tracks,
		"count":  len(tracks),
	})
}

// GetTopArtists gets the user's top artists
func (h *Handler) GetTopArtists(c *gin.Context) {
	token, exists := c.Get("spotify_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No Spotify token available"})
		return
	}

	timeRange := c.DefaultQuery("time_range", "medium_term")
	limitStr := c.DefaultQuery("limit", "20")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 || limit > 50 {
		limit = 20 // Default limit
	}

	artists, err := h.service.GetTopArtists(c, token.(string), timeRange, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get top artists"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"artists": artists,
		"count":   len(artists),
	})
}

func (h *Handler) GetRecentlyPlayed(c *gin.Context) {
	token, exists := c.Get("spotify_token")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No Spotify token available"})
		return
	}

	limitStr := c.DefaultQuery("limit", "20")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit <= 0 || limit > 50 {
		limit = 20 // Default limit
	}

	recentlyPlayed, err := h.service.GetRecentlyPlayed(c, token.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get recently played tracks"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"tracks": recentlyPlayed,
		"count":  len(recentlyPlayed),
	})
}

package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Printf("Error loading .env files : (", err)
	}

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	//Routes for the backend
	r.GET("/api/auth/login", handleSpotifyLogin)
	r.GET("/api/auth/callback", handleSpotifyCallback)
	r.GET("/api/spotify/top-tracks", authMiddleware(), handleSpotifyTopTracks)
	r.GET("/api/spotify/top-artists", authMiddleware(), handleSpotifyTopArtists)
	r.GET("/api/spotify/recently-played", authMiddleware(), handleSpotifyRecentlyPlayed)
	r.GET("/api/spotify/user-profile", authMiddleware(), handleSpotifyUserProfile)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}

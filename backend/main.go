// main.go
package main

import (
	"log"
	"os"
	"spotify-backend/handlers"
	"spotify-backend/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Printf("Error loading .env file: %v", err)
	}

	r := gin.Default()

	// Configure CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	// Routes
	r.GET("/api/auth/login", handlers.HandleSpotifyLogin)
	r.GET("/api/auth/callback", handlers.HandleSpotifyCallback)
	r.GET("/api/spotify/top-artists", middleware.AuthMiddleware(), handlers.HandleTopArtists)
	r.GET("/api/spotify/top-tracks", middleware.AuthMiddleware(), handlers.HandleTopTracks)
	r.GET("/api/spotify/user-profile", middleware.AuthMiddleware(), handlers.HandleUserProfile)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}

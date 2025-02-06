package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"auth-service/internal/config"
	"auth-service/internal/handler"
	"auth-service/pkg/jwt"
	"auth-service/pkg/spotify"
)

func main() {
	// Load config
	cfg := config.Load()

	// Initialize dependencies
	redisClient := config.NewRedisClient(cfg.RedisURL) // Properly typed Redis client
	jwtService := jwt.NewJWTService(cfg.JWTSecret)
	spotifyAuth := spotify.NewAuth(cfg.SpotifyClientID, cfg.SpotifyClientSecret, cfg.SpotifyRedirectURI)

	// Create services
	authHandler := handler.NewAuthHandler(spotifyAuth, jwtService, redisClient)

	// Setup router
	r := gin.Default()
	r.GET("/auth/login", authHandler.HandleLogin)
	r.GET("/auth/callback", authHandler.HandleCallback)
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Auth Service Home"})
	})

	// Start server
	log.Println("Auth service running on :8081")
	if err := r.Run(":8081"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

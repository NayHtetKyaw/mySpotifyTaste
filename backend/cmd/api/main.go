package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"myspotifytaste/internal/auth"
	"myspotifytaste/internal/middleware"
	"myspotifytaste/spotify"
)

func main() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env file found")
	}

	// Get environment variables
	clientID := os.Getenv("SPOTIFY_CLIENT_ID")
	clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
	redirectURL := os.Getenv("SPOTIFY_REDIRECT_URI")
	jwtSecret := os.Getenv("JWT_SECRET")
	port := os.Getenv("PORT")

	// Validate required environment variables
	if clientID == "" || clientSecret == "" || redirectURL == "" || jwtSecret == "" {
		log.Fatal("Missing required environment variables")
	}

	// Default port if not provided
	if port == "" {
		port = "8080"
	}

	// Initialize services
	authService := auth.NewSpotifyAuthService(clientID, clientSecret, redirectURL, jwtSecret)
	spotifyService := spotify.NewService(clientID, clientSecret)

	// Create Gin router
	r := gin.Default()

	// Set CORS headers
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Create and register handlers
	authHandler := auth.NewAuthHandler(authService)
	authHandler.RegisterRoutes(r)

	// Protected routes
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware(jwtSecret))
	{
		spotifyHandler := spotify.NewHandler(spotifyService)
		spotifyHandler.RegisterRoutes(protected)
	}

	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "home"})
	})

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Start the server
	log.Printf("Starting server on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}

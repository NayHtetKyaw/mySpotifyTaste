package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"myspotifytaste/internal/auth"
	"myspotifytaste/internal/middleware"
	"myspotifytaste/spotify"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: No .env file found")
	}

	clientID := os.Getenv("SPOTIFY_CLIENT_ID")
	clientSecret := os.Getenv("SPOTIFY_CLIENT_SECRET")
	redirectURL := os.Getenv("SPOTIFY_REDIRECT_URI")
	jwtSecret := os.Getenv("JWT_SECRET")
	port := os.Getenv("PORT")

	// Validate required environment variables
	if clientID == "" || clientSecret == "" || redirectURL == "" || jwtSecret == "" {
		log.Fatal("Missing required environment variables")
	}

	if port == "" {
		port = "8080"
	}

	// Initialize services
	authService := auth.NewSpotifyAuthService(clientID, clientSecret, redirectURL, jwtSecret)
	spotifyService := spotify.NewService(clientID, clientSecret)

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		allowedOrigins := []string{
			"http://localhost:3000",
			"https://production-domain.com",
		}

		origin := c.Request.Header.Get("Origin")
		for _, o := range allowedOrigins {
			if origin == o {
				c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
				break
			}
		}

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers",
			"Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Accept, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods",
			"GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	authGroup := r.Group("/api/auth")
	api := r.Group("/api")

	// Health check endpoint
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"message": "home"})
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Auth validation endpoint
	authGroup.GET("/validate", middleware.AuthMiddleware(jwtSecret), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"valid": true})
	})

	// Auth routes
	authHandler := auth.NewAuthHandler(authService)
	authHandler.RegisterRoutes(r)

	// Protected routes - IMPORTANT: Pass the api group to RegisterRoutes
	protected := api.Group("") // Empty group to keep the /api prefix
	protected.Use(middleware.AuthMiddleware(jwtSecret))
	{
		spotifyHandler := spotify.NewHandler(spotifyService)
		spotifyHandler.RegisterRoutes(protected) // This will register under /api/spotify/...
	}

	log.Printf("Starting server on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}

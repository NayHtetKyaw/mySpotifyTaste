package config

import (
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv"
)

type Config struct {
	SpotifyClientID     string
	SpotifyClientSecret string
	SpotifyRedirectURI  string
	JWTSecret           string
	RedisURL            string
}

func Load() *Config {
	_ = godotenv.Load() // Load .env file

	return &Config{
		SpotifyClientID:     os.Getenv("SPOTIFY_CLIENT_ID"),
		SpotifyClientSecret: os.Getenv("SPOTIFY_CLIENT_SECRET"),
		SpotifyRedirectURI:  os.Getenv("SPOTIFY_REDIRECT_URI"),
		JWTSecret:           os.Getenv("JWT_SECRET"),
		RedisURL:            os.Getenv("REDIS_URL"),
	}
}

func NewRedisClient(url string) *redis.Client {
	return redis.NewClient(&redis.Options{
		Addr:     url,
		Password: "", // no password set
		DB:       0,  // use default DB
	})
}

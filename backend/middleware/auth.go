package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if auth == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "There is no Authorization header"})
			c.Abort()
			return
		}

		token := strings.TrimPrefix(auth, "Bearer ")
		if token == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "There is no valid token"})
			c.Abort()
			return
		}

		c.Set("access_token", token)
		c.Next()
	}
}

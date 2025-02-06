FROM golang:1.21 AS builder 

WORKDIR /app

# Copy dependencies first
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o auth-service ./cmd/main.go

# Final stage
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/auth-service .
COPY --from=builder /app/.env .
EXPOSE 8081
CMD ["./auth-service"]

package spotify

import (
	"context"

	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
	"golang.org/x/oauth2"
)

type SpotifyAuth struct {
	auth *spotifyauth.Authenticator
}

func NewAuth(clientID, clientSecret, redirectURL string) *SpotifyAuth {
	auth := spotifyauth.New(
		spotifyauth.WithClientID(clientID),
		spotifyauth.WithClientSecret(clientSecret),
		spotifyauth.WithRedirectURL(redirectURL),
		spotifyauth.WithScopes(
			spotifyauth.ScopeUserReadPrivate,
			spotifyauth.ScopeUserReadRecentlyPlayed,
			spotifyauth.ScopeUserTopRead,
		),
	)
	return &SpotifyAuth{auth: auth}
}

func (s *SpotifyAuth) GetAuthURL(state string) string {
	return s.auth.AuthURL(state)
}

func (s *SpotifyAuth) ExchangeCode(ctx context.Context, code string) (*oauth2.Token, error) {
	return s.auth.Exchange(ctx, code)
}

func (s *SpotifyAuth) NewClient(ctx context.Context, token *oauth2.Token) *spotify.Client {
	return spotify.New(s.auth.Client(ctx, token))
}

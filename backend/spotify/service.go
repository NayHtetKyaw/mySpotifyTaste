package spotify

import (
	"context"
	"time"

	"github.com/zmb3/spotify/v2"
	spotifyauth "github.com/zmb3/spotify/v2/auth"
	"golang.org/x/oauth2"
)

type Service struct {
	auth *spotifyauth.Authenticator
}

func NewService(clientID, clientSecret string) *Service {
	auth := spotifyauth.New(
		spotifyauth.WithClientID(clientID),
		spotifyauth.WithClientSecret(clientSecret),
	)

	return &Service{
		auth: auth,
	}
}

func (s *Service) GetClient(accessToken string) *spotify.Client {
	token := &oauth2.Token{
		AccessToken: accessToken,
		TokenType:   "Bearer",
		Expiry:      time.Now().Add(time.Hour),
	}

	httpClient := s.auth.Client(context.Background(), token)
	return spotify.New(httpClient)
}

func (s *Service) GetCurrentlyPlaying(ctx context.Context, accessToken string) (*spotify.CurrentlyPlaying, error) {
	client := s.GetClient(accessToken)
	return client.PlayerCurrentlyPlaying(ctx)
}

func (s *Service) GetTopTracks(ctx context.Context, accessToken string, timeRange string, limit int) ([]spotify.FullTrack, error) {
	client := s.GetClient(accessToken)

	var timeRangeEnum spotify.Range
	switch timeRange {
	case "short_term":
		timeRangeEnum = spotify.ShortTermRange
	case "medium_term":
		timeRangeEnum = spotify.MediumTermRange
	case "long_term":
		timeRangeEnum = spotify.LongTermRange
	default:
		timeRangeEnum = spotify.MediumTermRange
	}

	tracks, err := client.CurrentUsersTopTracks(ctx, spotify.Limit(limit), spotify.Timerange(timeRangeEnum))
	if err != nil {
		return nil, err
	}

	return tracks.Tracks, nil
}

func (s *Service) GetTopArtists(ctx context.Context, accessToken string, timeRange string, limit int) ([]spotify.FullArtist, error) {
	client := s.GetClient(accessToken)

	var timeRangeEnum spotify.Range
	switch timeRange {
	case "short_term":
		timeRangeEnum = spotify.ShortTermRange
	case "medium_term":
		timeRangeEnum = spotify.MediumTermRange
	case "long_term":
		timeRangeEnum = spotify.LongTermRange
	default:
		timeRangeEnum = spotify.MediumTermRange
	}

	artists, err := client.CurrentUsersTopArtists(ctx, spotify.Limit(limit), spotify.Timerange(timeRangeEnum))
	if err != nil {
		return nil, err
	}

	return artists.Artists, nil
}

// GetRecentlyPlayed gets the user's recently played tracks
func (s *Service) GetRecentlyPlayed(ctx context.Context, accessToken string) ([]spotify.RecentlyPlayedItem, error) {
	client := s.GetClient(accessToken)

	recentlyPlayed, err := client.PlayerRecentlyPlayed(ctx)
	if err != nil {
		return nil, err
	}

	return recentlyPlayed, nil
}

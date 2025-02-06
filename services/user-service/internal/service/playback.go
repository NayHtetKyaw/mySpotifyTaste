package service

import (
	"encoding/json"
	"time"

	"github.com/zmb3/spotify"
)

func TrackPlaybackEvent(userID string, track spotify.FullTrack) {
	event := PlaybackEvent{
		UserID:   userID,
		TrackID:  track.ID,
		Duration: track.Duration,
		PlayedAt: time.Now(),
	}

	msg, _ := json.Marshal(event)
	kafka.Producer("playback-events", msg)
}

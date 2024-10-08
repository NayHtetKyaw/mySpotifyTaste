import { NextRequest, NextResponse } from "next/server";
import { spotifyApi } from "@lib/spotify";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const access_token = searchParams.get("access_token");
  const term =
    (searchParams.get("term") as "short_term" | "long_term" | "medium_term") ||
    "short_term";
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  if (!access_token) {
    return NextResponse.json(
      { error: "No access token provided" },
      { status: 401 }
    );
  }

  spotifyApi.setAccessToken(access_token);

  try {
    const [
      userProfile,
      topTracks,
      topArtists,
      recentlyPlayed,
      currentlyPlaying,
    ] = await Promise.all([
      spotifyApi.getMe(),
      spotifyApi.getMyTopTracks({ time_range: term, limit }),
      spotifyApi.getMyTopArtists({ time_range: term, limit }),
      spotifyApi.getMyRecentlyPlayedTracks({ limit }),
      spotifyApi.getMyCurrentPlayingTrack(),
    ]);

    const topTracksPlayTime = topTracks.body.items.length * 3.5 * 60;

    const allTimePlayedTime = recentlyPlayed.body.items.reduce(
      (total, item) => {
        return total + item.track.duration_ms / 1000;
      },
      0
    );

    const genreCounts = topArtists.body.items.reduce(
      (counts: { [key: string]: number }, artist) => {
        artist.genres.forEach((genre) => {
          counts[genre] = (counts[genre] || 0) + 1;
        });
        return counts;
      },
      {} as { [key: string]: number }
    );
    const topGenre = Object.entries(genreCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    const topGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50)
        .map(([genre]) => ({
            name: genre,
         }));

    const albumCounts = topTracks.body.items.reduce(
      (
        counts: {
          [key: string]: {
            album: SpotifyApi.AlbumObjectSimplified;
            count: number;
          };
        },
        track
      ) => {
        const album = track.album;
        if (!counts[album.id]) {
          counts[album.id] = { album, count: 0 };
        }
        counts[album.id].count += 1;
        return counts;
      },
      {} as {
        [key: string]: {
          album: SpotifyApi.AlbumObjectSimplified;
          count: number;
        };
      }
    );

    const topAlbums = Object.values(albumCounts).sort(
        (a, b) => b.count - a.count
    ).map((album) => album.album);

    const userData = {
      user: userProfile.body,
      topTracks: topTracks.body.items,
      topArtists: topArtists.body.items,
      recentlyPlayed: recentlyPlayed.body.items,
      currentlyPlaying: currentlyPlaying.body,
      topTracksPlayTime,
      allTimePlayedTime,
      topGenre,
      topGenres,
      topAlbums,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" });
  }
}

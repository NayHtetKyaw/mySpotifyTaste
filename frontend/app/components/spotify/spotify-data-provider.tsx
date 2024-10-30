import { SpotifyApiClient, SpotifyArtist, SpotifyTrack } from "@lib/api-client";

export interface ProcessedSpotifyData {
  topArtists: SpotifyArtist[];
  topTracks: SpotifyTrack[];
  topGenres: { genre: string; count: number }[];
  topAlbums: {
    name: string;
    imageUrl: string;
    artistName: string;
    tracks: number;
  }[];
  error?: string;
}

async function processSpotifyData(): Promise<ProcessedSpotifyData> {
  try {
    const api = new SpotifyApiClient();
    
    const [artistsResponse, tracksResponse] = await Promise.all([
      api.getTopArtists(),
      api.getTopTracks(),
    ]);

    // top artists
    const topArtists = artistsResponse.items as SpotifyArtist[];

    // top tracks
    const topTracks = tracksResponse.items as SpotifyTrack[];

    // genres
    const genreCount = new Map<string, number>();
    topArtists.forEach(artist => {
      artist.genres.forEach(genre => {
        genreCount.set(genre, (genreCount.get(genre) || 0) + 1);
      });
    });

    const topGenres = Array.from(genreCount.entries())
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count);

    //top albums
    const albumsMap = new Map<string, {
      name: string;
      imageUrl: string;
      artistName: string;
      tracks: number;
    }>();

    topTracks.forEach(track => {
      const albumId = track.album.name; 
      if (!albumsMap.has(albumId)) {
        albumsMap.set(albumId, {
          name: track.album.name,
          imageUrl: track.album.images[0]?.url || '',
          artistName: track.artists[0]?.name || 'Unknown Artist',
          tracks: 1,
        });
      } else {
        const album = albumsMap.get(albumId)!;
        album.tracks += 1;
      }
    });

    const topAlbums = Array.from(albumsMap.values())
      .sort((a, b) => b.tracks - a.tracks);

    return {
      topArtists,
      topTracks,
      topGenres,
      topAlbums,
    };

  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return {
      topArtists: [],
      topTracks: [],
      topGenres: [],
      topAlbums: [],
      error: 'Failed to fetch Spotify data'
    };
  }
}

export default async function SpotifyData() {
  const data = await processSpotifyData();
  
  return (
    <div id="spotify-data" className="hidden" data-spotify={JSON.stringify(data)} />
  );
}
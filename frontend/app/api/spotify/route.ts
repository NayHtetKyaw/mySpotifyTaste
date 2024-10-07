import { NextRequest, NextResponse } from 'next/server';
import { spotifyApi } from '@lib/spotify';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const access_token = searchParams.get('access_token');
  const term = (searchParams.get('term') as 'short_term' | 'long_term' | 'medium_term') || 'short_term';
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  if (!access_token) {
    return NextResponse.json({ error: 'No access token provided' }, { status: 401 });
  }

  spotifyApi.setAccessToken(access_token);

  try {
    const [
      userProfile,
      topTracks,
      topArtists,
      recentlyPlayed,
    ] = await Promise.all([
      spotifyApi.getMe(),
      spotifyApi.getMyTopTracks({ time_range: term, limit }),
      spotifyApi.getMyTopArtists({ limit: 50 }),
      spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }),
    ]);

    const userData = {
      user: userProfile.body,
      topTracks: topTracks.body.items,
      topArtists: topArtists.body.items,
      recentlyPlayed: recentlyPlayed.body.items,
    };

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
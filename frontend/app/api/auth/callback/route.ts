import { NextRequest, NextResponse } from 'next/server';
import { spotifyApi } from '@lib/spotify';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;

    // Redirect to the home page with the access token
    return NextResponse.redirect(`${request.nextUrl.origin}/home?access_token=${access_token}`);
  } catch (error) {
    console.error('Something went wrong!', error);
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 });
  }
}
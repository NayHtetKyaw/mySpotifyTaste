import SpotifyWebApi from "spotify-web-api-node";

export type SpotifyError = {
    status: number;
    message: string;
};

export function isSpotifyError(error: unknown): error is SpotifyError {
    return (
        typeof error === "object" &&
        error !== null &&
        "statusCode" in error &&
        "message" in error
    );
}

class SpotifyAPI {
    private static instance: SpotifyWebApi;

    public static getInstance(): SpotifyWebApi {
        if (!SpotifyAPI.instance) {
            SpotifyAPI.instance = new SpotifyWebApi({
                clientId: process.env.SPOTIFY_CLIENT_ID,
                clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            });
        }
        return SpotifyAPI.instance;
    }

    public static setAccessToken(accessToken: string): void {
        SpotifyAPI.getInstance().setAccessToken(accessToken);
    }
}

export async function getMe(accessToken: string): Promise<SpotifyApi.UserProfileResponse> {
    SpotifyAPI.setAccessToken(accessToken);
    const response = await SpotifyAPI.getInstance().getMe();
    return response.body;
}

export async function getTopTracks(
    accessToken: string,
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'long_term'
): Promise<SpotifyApi.TrackObjectFull[]> {
    SpotifyAPI.setAccessToken(accessToken);
    const response = await SpotifyAPI.getInstance().getMyTopTracks({
        limit: 50,
        offset: 0,
        time_range: timeRange,
    });
    return response.body.items;
}

export async function getTopArtists(
    accessToken: string,
    timeRange: 'short_term' | 'medium_term' | 'long_term' = 'long_term'
): Promise<SpotifyApi.ArtistObjectFull[]> {
    SpotifyAPI.setAccessToken(accessToken);
    const response = await SpotifyAPI.getInstance().getMyTopArtists({
        limit: 50,
        offset: 0,
        time_range: timeRange,
    });
    return response.body.items;
}

export default SpotifyAPI;
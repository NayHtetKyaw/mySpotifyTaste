import SpotifyWebApi from "spotify-web-api-node";

const spotifyWebApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyWebApi;

export async function getTopTracks(accessToken: string) : Promise<SpotifyApi.TrackObjectFull[]> {
    spotifyWebApi.setAccessToken(accessToken);

    const response = await spotifyWebApi.getMyTopTracks({
        limit: 50,
        offset: 0,
        time_range: "long_term",
    });

    return response.body.items;
}

export async function getTopArtists(accessToken: string): Promise<SpotifyApi.ArtistObjectFull[]> {
    spotifyWebApi.setAccessToken(accessToken);

    const response = await spotifyWebApi.getMyTopArtists({
        limit: 50,
        offset: 0,
        time_range: "long_term",
    });

    return response.body.items;
}

export type SpotifyError = {
    status: number;
    message: string;
}


export function isSpotifyError(error: unknown): error is SpotifyError {
    return (
        typeof error === "object" &&
        error !== null &&
        "statusCode" in error &&
        "message" in error
    );
}
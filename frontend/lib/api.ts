const API_BASE_URL = process.env.NEXT_PULBLIC_API_BASE_URL || "http://localhost:8080";

export const getLoginUrl = async(): Promise<string> => {
    const response: Response = await fetch(`${API_BASE_URL}/auth/login`);
    const data = await response.json();
    return data.loginUrl;
}

export const GetTopArtists = async(accessToken: string) => {
    const response: Response = await fetch(`${API_BASE_URL}/top/artists`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return response.json();
};

export const getTopTracks = async(accessToken: string) => {
    const response: Response = await fetch(`${API_BASE_URL}/top/tracks`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return response.json();
}
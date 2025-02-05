const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export class SpotifyApiClient {
  private accessToken: string | null = null;

  constructor() {
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('spotify_access_token');
    }
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  public async getLoginUrl(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`);
    const data = await response.json();
    return data.loginUrl;
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('spotify_access_token', token);
    }
  }

  public clearAccessToken() {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('spotify_access_token');
    }
  }

  public async getUserProfile() {
    return this.fetchWithAuth('/api/spotify/user-profile');
  }

  public async getTopArtists() {
    return this.fetchWithAuth('/api/spotify/top-artists');
  }

  public async getTopTracks() {
    return this.fetchWithAuth('/api/spotify/top-tracks');
  }

  // Helper method to check if user is authenticated
  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }
}

// a singleton instance
export const spotifyApi = new SpotifyApiClient();

// Type definitions for the API responses
export interface SpotifyUser {
  id: string;
  display_name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  followers: {total: number};
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  genres: string[];
  popularity: number;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  album: {
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    name: string;
  };
  artists: Array<{
    id: string;
    name: string;
  }>;
}
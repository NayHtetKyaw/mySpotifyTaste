import NextAuth, { DefaultSession, Account } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import type { JWT } from "next-auth/jwt";

interface ExtendedSession extends DefaultSession {
    accessToken?: string;
    error?: string;
}

interface ExtendedToken extends JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
}

const scopes = [
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-top-read",
    "user-library-read",
    "user-follow-read",
    "playlist-read-private",
    "user-read-recently-played",
].join(",");

const params = {
    scope: scopes,
};

const LOGIN_REDIRECT =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams(params).toString();

async function refreshAccessToken(token: ExtendedToken) {
        try {
        const url = "https://accounts.spotify.com/api/token";
        const basic = Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64");
    
        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        if (token.refreshToken) {
            params.append("refresh_token", token.refreshToken);
        }
    
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
        });
    
        const data = await response.json();
    
        return {
            ...token,
            accessToken: data.access_token,
            refreshToken: data.refresh_token ?? token.refreshToken,
            accessTokenExpires: Date.now() + data.expires_in * 1000,
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}

export const authOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
            authorization: LOGIN_REDIRECT,
        }),
    ],

    callbacks: {
        async jwt({
            token,
            account,
        }: {
            token: ExtendedToken;
            account: Account | null;
        }) {
            // Initial sign in
            if (account) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: (account.expires_at || 0) * 1000,
                };
            }

            if (
                token.accessTokenExpires &&
                Date.now() < token.accessTokenExpires
            ) {
                return token;
            }

            return await refreshAccessToken(token);
        },

        async session({
            session,
            token,
        }: {
            session: ExtendedSession;
            token: ExtendedToken;
        }) {
            session.accessToken = token.accessToken;
            session.error = token.error;

            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 
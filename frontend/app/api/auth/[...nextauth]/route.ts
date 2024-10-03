import NextAuth, { DefaultSession, Account, User } from "next-auth";
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

async function refreshAccessToken(token: any) {
    try {
        const url = "https://accounts.spotify.com/api/token";
        const basic = Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authroization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            }),
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

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
            authorization: LOGIN_REDIRECT,
        }),
    ],

    callbacks: {
        async jwt({ token, account } : { token: ExtendedToken; account: Account | null}) {

            //initial sign in
            if (account) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    accessTokenExpires: (account.expires_at || 0) * 1000,
                };
            }

            //to return previous token if the access token has not expired
            if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
                return token;
            }

            //to refresh the access token when expired !!!
            return await refreshAccessToken(token);
        },

        async session({ session, token } : { session: ExtendedSession; token: ExtendedToken}) {
            session.accessToken = token.accessToken;
            session.error = token.error;

            return session;
        },
    },
});

import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";

const SPOTIFY_REFRESH_TOKEN_URL = "https://accounts.spotify.com/api/token";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const basicAuth = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(SPOTIFY_REFRESH_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

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
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "user-read-email user-read-private user-top-read user-read-recently-played",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: any }) {
      // Initial sign in
      if (account) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // Return the previous token if the access token has not expired
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Access token has expired, refresh it
      return await refreshAccessToken(token);
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
  },
  pages: {
    signIn: "/welcome",
    signOut: "/welcome",
    error: "/auth/error",
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
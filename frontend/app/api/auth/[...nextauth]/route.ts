import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions ={
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID || "",
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
        }),
    ],

    pages: {
        signIn: "/welcome",
        signOut: "/welcome",
        error: "/welcome",
    },

    callbacks: {
        async jwt({ token, account }: { token: any; account?: any; }) {
            if (account) {
                token.accessToken = account.accessToken;
            }
            return token;
        }, 

        async session({ session, token }: { session: any; token: any }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    };


    const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };
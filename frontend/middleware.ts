import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    
    if (!token) {
        const signInUrl = new URL('/welcome', request.url);
        return NextResponse.redirect(signInUrl);
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/home/:path*',
        '/profile/:path*',
    ]
};
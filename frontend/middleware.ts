import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    
    if (!token) {
        // Redirect to the signin page if there's no token
        const signInUrl = new URL('/api/auth/signin', request.url)
        signInUrl.searchParams.set('callbackUrl', request.url)
        return NextResponse.redirect(signInUrl)
    }
    
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/home/:path*',
        '/profile/:path*',
    ]
}
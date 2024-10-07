import { NextRequest, NextResponse } from 'next/server';
import { LOGIN_URL } from '@lib/spotify';

export async function GET(request: NextRequest) {
  return NextResponse.json({ loginUrl: LOGIN_URL });
}
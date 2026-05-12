// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token'); // O donde guardes el token

  // Si intenta ir a zonas privadas sin token, al login
  if (!token && (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/select-role'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
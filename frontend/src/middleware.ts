// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userRoleCookie = request.cookies.get('user_role');
  const role = userRoleCookie?.value?.toLowerCase(); // Ép về chữ thường để check cho chắc

  const path = request.nextUrl.pathname;

  // Nếu truy cập vào /admin mà role không phải admin thì đá ra trang chủ
  if (path.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware for Session & Mobile Entry Routing
 * If user accesses /login or / with a valid session cookie, auto-redirect to role dashboard.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('iris_jwt_token')?.value || request.cookies.get('sb-access-token')?.value;
  const userRole = request.cookies.get('iris_user_role')?.value;

  if (token && (pathname === '/login' || pathname === '/')) {
    let targetDashboard = '/student';

    if (userRole) {
      const normalizedRole = userRole.trim().toLowerCase();
      const roleMap: Record<string, string> = {
        student: '/student',
        teacher: '/teacher',
        faculty: '/teacher',
        admin: '/admin',
        superadmin: '/admin',
        director: '/director',
        warden: '/warden',
        security: '/security',
        vendor: '/canteen',
        driver: '/driver',
        parent: '/parent',
        hod: '/hod',
        vp: '/vp'
      };
      targetDashboard = roleMap[normalizedRole] || '/student';
    }

    return NextResponse.redirect(new URL(targetDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login']
};

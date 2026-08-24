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
      const roleMap: Record<string, string> = {
        Student: '/student',
        Teacher: '/teacher',
        Faculty: '/teacher',
        Admin: '/admin',
        SuperAdmin: '/admin',
        Director: '/director',
        Warden: '/warden',
        Security: '/security',
        Vendor: '/canteen',
        Driver: '/driver',
        Parent: '/parent',
        HOD: '/hod',
        VP: '/vp'
      };
      targetDashboard = roleMap[userRole] || '/student';
    }

    return NextResponse.redirect(new URL(targetDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login']
};

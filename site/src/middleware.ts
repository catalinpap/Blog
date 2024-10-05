import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/write'];

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;


    const isAuthenticated = request.cookies.get('authenticated')?.value === 'true';

    // Redirect to /authenticate page if route is protected
    if (!isAuthenticated && protectedRoutes.includes(pathname)) {
        const absoluteURL = new URL('/authenticate', request.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }

    if(isAuthenticated && pathname === '/authenticate') {
       const absoluteURL = new URL('/', request.nextUrl.origin);
       return NextResponse.redirect(absoluteURL);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/write', '/authenticate']
};
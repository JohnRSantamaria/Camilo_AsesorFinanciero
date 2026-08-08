import {type NextRequest, NextResponse} from 'next/server';
import {updateSession} from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
	const {supabaseResponse, user} = await updateSession(request);
	const {pathname} = request.nextUrl;

	if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !user) {
		const url = request.nextUrl.clone();
		url.pathname = '/admin/login';
		return NextResponse.redirect(url);
	}

	if (pathname === '/admin/login' && user) {
		const url = request.nextUrl.clone();
		url.pathname = '/admin';
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}

export const config = {
	matcher: ['/admin/:path*'],
};

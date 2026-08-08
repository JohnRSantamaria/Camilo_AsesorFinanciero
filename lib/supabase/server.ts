import {createServerClient, parseCookieHeader, serializeCookieHeader} from '@supabase/ssr';
import type {GetServerSidePropsContext} from 'next';

export function createClient({req, res}: GetServerSidePropsContext) {
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return parseCookieHeader(req.headers.cookie ?? '') as {
						name: string;
						value: string;
					}[];
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({name, value, options}) => {
						res.appendHeader('Set-Cookie', serializeCookieHeader(name, value, options));
					});
				},
			},
		}
	);
}

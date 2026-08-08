import type {GetServerSidePropsContext, Redirect} from 'next';
import type {User} from '@supabase/supabase-js';
import {createClient} from '@/lib/supabase/server';
import type {AdminRole} from '@/types/post';

export type AdminSession = {
	user: User;
	role: AdminRole;
	email: string;
};

export async function requireAdmin(
	context: GetServerSidePropsContext
): Promise<{ok: true; session: AdminSession} | {ok: false; redirect: {redirect: Redirect}}> {
	const supabase = createClient(context);
	const {
		data: {user},
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			ok: false,
			redirect: {
				redirect: {
					destination: '/admin/login',
					permanent: false,
				},
			},
		};
	}

	const {data: admin, error} = await supabase
		.from('admin_users')
		.select('role')
		.eq('user_id', user.id)
		.maybeSingle();

	const role = admin?.role as AdminRole | undefined;
	const isAllowed = !error && role && (role === 'owner' || role === 'admin');

	if (!isAllowed) {
		// Keep session cookies for login page messaging; middleware will still
		// bounce authenticated users away from /admin/login unless we sign out.
		await supabase.auth.signOut();
		return {
			ok: false,
			redirect: {
				redirect: {
					destination: '/admin/login?error=unauthorized',
					permanent: false,
				},
			},
		};
	}

	return {
		ok: true,
		session: {
			user,
			role,
			email: user.email ?? '',
		},
	};
}

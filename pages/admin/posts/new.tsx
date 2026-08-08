import type {GetServerSideProps} from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import PostForm from '@/components/admin/PostForm';
import {requireAdmin} from '@/lib/supabase/admin';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

type NewPostPageProps = {
	email: string;
	userId: string;
};

export default function NewPostPage({email, userId}: NewPostPageProps) {
	return (
		<AdminLayout
			title='Admin — Nuevo post'
			email={email}
		>
			<div className='flex flex-col gap-6 max-w-3xl'>
				<div>
					<h2 className='text-2xl font-bold text-primary'>Nuevo post</h2>
					<p className='text-sm text-muted-foreground mt-1'>
						Escribe en Markdown y publica cuando esté listo
					</p>
				</div>
				<Card className='bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-base'>Contenido</CardTitle>
					</CardHeader>
					<CardContent>
						<PostForm userId={userId} />
					</CardContent>
				</Card>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps: GetServerSideProps<NewPostPageProps> = async (context) => {
	const result = await requireAdmin(context);
	if (!result.ok) return result.redirect;

	return {
		props: {
			email: result.session.email,
			userId: result.session.user.id,
		},
	};
};

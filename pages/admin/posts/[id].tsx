import type {GetServerSideProps} from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import PostForm from '@/components/admin/PostForm';
import {requireAdmin} from '@/lib/supabase/admin';
import {createClient} from '@/lib/supabase/server';
import type {Post} from '@/types/post';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

type EditPostPageProps = {
	email: string;
	userId: string;
	post: Post;
};

export default function EditPostPage({email, userId, post}: EditPostPageProps) {
	return (
		<AdminLayout
			title={`Admin — ${post.title}`}
			email={email}
		>
			<div className='flex flex-col gap-6 max-w-3xl'>
				<div>
					<h2 className='text-2xl font-bold text-primary'>Editar post</h2>
					<p className='text-sm text-muted-foreground mt-1'>/{post.slug}</p>
				</div>
				<Card className='bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-base'>Contenido</CardTitle>
					</CardHeader>
					<CardContent>
						<PostForm
							userId={userId}
							initialPost={post}
						/>
					</CardContent>
				</Card>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps: GetServerSideProps<EditPostPageProps> = async (context) => {
	const result = await requireAdmin(context);
	if (!result.ok) return result.redirect;

	const id = context.params?.id;
	if (typeof id !== 'string') {
		return {
			notFound: true,
		};
	}

	const supabase = createClient(context);
	const {data, error} = await supabase.from('posts').select('*').eq('id', id).maybeSingle();

	if (error || !data) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			email: result.session.email,
			userId: result.session.user.id,
			post: data as Post,
		},
	};
};

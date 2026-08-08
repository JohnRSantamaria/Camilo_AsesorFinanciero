import type {GetServerSideProps} from 'next';
import Link from 'next/link';
import {Raleway} from 'next/font/google';
import AdminLayout from '@/components/admin/AdminLayout';
import PostArticle from '@/components/blog/PostArticle';
import {requireAdmin} from '@/lib/supabase/admin';
import {createClient} from '@/lib/supabase/server';
import type {Post} from '@/types/post';
import {Button} from '@/components/ui/button';

const raleway = Raleway({subsets: ['latin']});

type PreviewPageProps = {
	email: string;
	post: Post;
};

export default function AdminPostPreviewPage({email, post}: PreviewPageProps) {
	return (
		<AdminLayout
			title={`Vista previa — ${post.title}`}
			email={email}
		>
			<div className={`flex flex-col gap-4 ${raleway.className}`}>
				<div className='rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm'>
					<strong>Vista previa</strong> — este contenido no es público salvo que esté publicado
					y la fecha de publicación ya haya pasado.
				</div>
				<div className='flex flex-wrap gap-2'>
					<Button
						asChild
						variant='outline'
						size='sm'
					>
						<Link href={`/admin/posts/${post.id}`}>Volver a editar</Link>
					</Button>
					{post.published ? (
						<Button
							asChild
							variant='outline'
							size='sm'
						>
							<Link
								href={`/blog/${post.slug}`}
								target='_blank'
							>
								Ver en blog (si ya es público)
							</Link>
						</Button>
					) : null}
				</div>
				<div className='rounded-lg border border-border bg-light dark:bg-dark p-4 sm:p-6'>
					<PostArticle post={post} />
				</div>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps: GetServerSideProps<PreviewPageProps> = async (context) => {
	const result = await requireAdmin(context);
	if (!result.ok) return result.redirect;

	const id = context.params?.id;
	if (typeof id !== 'string') {
		return {notFound: true};
	}

	const supabase = createClient(context);
	const {data, error} = await supabase.from('posts').select('*').eq('id', id).maybeSingle();

	if (error || !data) {
		return {notFound: true};
	}

	return {
		props: {
			email: result.session.email,
			post: data as Post,
		},
	};
};

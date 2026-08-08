import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type {GetServerSideProps} from 'next';
import {Raleway} from 'next/font/google';
import Footer from '@/components/Footer';
import NavbarMenu from '@/components/NavbarMenu';
import MobileNabBarMenu from '@/components/MobileNabBarMenu';
import Layout from '@/components/Layout';
import {createPublicClient} from '@/lib/supabase/public';
import {isPostLive} from '@/lib/posts/visibility';
import type {Post} from '@/types/post';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

const raleway = Raleway({subsets: ['latin']});

type BlogIndexProps = {
	posts: Post[];
};

function formatDate(value: string | null) {
	if (!value) return '';
	return new Date(value).toLocaleDateString('es-CO', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export default function BlogIndexPage({posts}: BlogIndexProps) {
	return (
		<>
			<Head>
				<title>Blog — Camilo Meza Asesoría Financiera</title>
				<meta
					name='description'
					content='Artículos de educación y mentalidad financiera'
				/>
			</Head>
			<main
				className={`flex min-h-screen flex-col bg-light dark:bg-dark ${raleway.className}`}
			>
				<Layout className='relative flex flex-col gap-2 w-full'>
					<NavbarMenu />
					<MobileNabBarMenu />
					<section className='px-4 py-8 max-w-4xl mx-auto w-full'>
						<h1 className='text-3xl md:text-4xl font-bold text-primary mb-2'>Blog</h1>
						<p className='text-muted-foreground mb-8'>
							Educación y mentalidad financiera
						</p>

						{posts.length === 0 ? (
							<p className='text-gray-600 dark:text-gray-300'>
								Pronto publicaremos artículos. Vuelve pronto.
							</p>
						) : (
							<ul className='flex flex-col gap-6'>
								{posts.map((post) => (
									<li key={post.id}>
										<Link href={`/blog/${post.slug}`}>
											<Card className='bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
												{post.cover_image ? (
													<div className='relative w-full h-48'>
														<Image
															src={post.cover_image}
															alt={post.title}
															fill
															className='object-cover'
															sizes='(max-width: 768px) 100vw, 896px'
														/>
													</div>
												) : null}
												<CardHeader>
													<div className='flex flex-wrap items-center gap-2 mb-1'>
														{post.video_url ? (
															<Badge variant='secondary'>Video</Badge>
														) : null}
														{post.published_at ? (
															<span className='text-xs text-muted-foreground'>
																{formatDate(post.published_at)}
															</span>
														) : null}
													</div>
													<CardTitle className='text-xl text-primary'>
														{post.title}
													</CardTitle>
													{post.excerpt ? (
														<CardDescription className='text-gray-700 dark:text-gray-300'>
															{post.excerpt}
														</CardDescription>
													) : null}
												</CardHeader>
												<CardContent>
													<span className='text-sm font-medium text-primary'>
														Leer más →
													</span>
												</CardContent>
											</Card>
										</Link>
									</li>
								))}
							</ul>
						)}
					</section>
				</Layout>
				<Footer />
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<BlogIndexProps> = async () => {
	const supabase = createPublicClient();
	const {data, error} = await supabase
		.from('posts')
		.select('*')
		.eq('published', true)
		.order('sort_order', {ascending: true})
		.order('published_at', {ascending: false});

	if (error) {
		return {props: {posts: []}};
	}

	const posts = ((data ?? []) as Post[]).filter((post) => isPostLive(post));

	return {
		props: {
			posts,
		},
	};
};

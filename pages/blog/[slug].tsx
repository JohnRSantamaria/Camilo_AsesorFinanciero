import {useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type {GetServerSideProps} from 'next';
import {Raleway} from 'next/font/google';
import Footer from '@/components/Footer';
import NavbarMenu from '@/components/NavbarMenu';
import MobileNabBarMenu from '@/components/MobileNabBarMenu';
import Layout from '@/components/Layout';
import PostArticle from '@/components/blog/PostArticle';
import {createPublicClient} from '@/lib/supabase/public';
import {trackEvent} from '@/lib/analytics';
import {isPostLive} from '@/lib/posts/visibility';
import type {Post} from '@/types/post';

const raleway = Raleway({subsets: ['latin']});

type BlogPostPageProps = {
	post: Post;
};

export default function BlogPostPage({post}: BlogPostPageProps) {
	const pageTitle = post.meta_title?.trim() || post.title;
	const pageDescription =
		post.meta_description?.trim() || post.excerpt?.trim() || post.title;
	const ogImage = post.cover_image || '/seo/og_image.png';

	useEffect(() => {
		trackEvent({
			action: 'blog_post_view',
			category: 'blog',
			label: post.slug,
			params: {
				slug: post.slug,
				title: post.title,
			},
		});
	}, [post.slug, post.title]);

	return (
		<>
			<Head>
				<title>{`${pageTitle} — Camilo Meza`}</title>
				<meta
					name='description'
					content={pageDescription}
				/>
				<meta
					property='og:title'
					content={pageTitle}
				/>
				<meta
					property='og:description'
					content={pageDescription}
				/>
				<meta
					property='og:type'
					content='article'
				/>
				<meta
					property='og:image'
					content={ogImage}
				/>
			</Head>
			<main
				className={`flex min-h-screen flex-col bg-light dark:bg-dark ${raleway.className}`}
			>
				<Layout className='relative flex flex-col gap-2 w-full'>
					<NavbarMenu />
					<MobileNabBarMenu />
					<div className='px-4 py-8 w-full'>
						<Link
							href='/blog'
							className='text-sm text-primary hover:underline mb-6 inline-block max-w-3xl mx-auto w-full'
						>
							← Volver al blog
						</Link>
						<PostArticle post={post} />
					</div>
				</Layout>
				<Footer />
			</main>
		</>
	);
}

export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async (context) => {
	const slug = context.params?.slug;
	if (typeof slug !== 'string') {
		return {notFound: true};
	}

	const supabase = createPublicClient();
	const {data, error} = await supabase
		.from('posts')
		.select('*')
		.eq('slug', slug)
		.eq('published', true)
		.maybeSingle();

	if (error || !data || !isPostLive(data as Post)) {
		return {notFound: true};
	}

	return {
		props: {
			post: data as Post,
		},
	};
};

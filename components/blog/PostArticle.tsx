import Image from 'next/image';
import YouTubeEmbed from '@/components/blog/YouTubeEmbed';
import PostContent from '@/components/blog/PostContent';
import type {Post} from '@/types/post';

type PostArticleProps = {
	post: Pick<
		Post,
		'title' | 'excerpt' | 'content' | 'cover_image' | 'video_url' | 'published_at'
	>;
};

function formatDate(value: string | null) {
	if (!value) return '';
	return new Date(value).toLocaleDateString('es-CO', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export default function PostArticle({post}: PostArticleProps) {
	return (
		<article className='max-w-3xl mx-auto w-full'>
			<header className='mb-8'>
				{post.published_at ? (
					<p className='text-sm text-muted-foreground mb-2'>{formatDate(post.published_at)}</p>
				) : null}
				<h1 className='text-3xl md:text-4xl font-bold text-primary mb-4'>{post.title}</h1>
				{post.excerpt ? (
					<p className='text-lg text-gray-700 dark:text-gray-300'>{post.excerpt}</p>
				) : null}
			</header>

			{post.cover_image ? (
				<div className='relative w-full h-56 md:h-72 mb-8 rounded-lg overflow-hidden shadow-md'>
					<Image
						src={post.cover_image}
						alt={post.title}
						fill
						className='object-cover'
						priority
						sizes='(max-width: 768px) 100vw, 768px'
					/>
				</div>
			) : null}

			{post.video_url ? (
				<div className='mb-8'>
					<YouTubeEmbed
						url={post.video_url}
						title={post.title}
					/>
				</div>
			) : null}

			<PostContent content={post.content} />
		</article>
	);
}

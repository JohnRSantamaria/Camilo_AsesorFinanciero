import {getYouTubeId} from '@/lib/posts/youtube';

type YouTubeEmbedProps = {
	url: string;
	title?: string;
};

export default function YouTubeEmbed({url, title = 'Video de YouTube'}: YouTubeEmbedProps) {
	const id = getYouTubeId(url);
	if (!id) return null;

	const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;

	return (
		<div className='relative w-full overflow-hidden rounded-lg bg-dark aspect-video shadow-md'>
			<iframe
				src={src}
				title={title}
				loading='lazy'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen
				className='absolute inset-0 h-full w-full border-0'
			/>
		</div>
	);
}

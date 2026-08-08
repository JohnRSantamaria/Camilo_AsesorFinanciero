import {sanitizePostHtml} from '@/lib/posts/sanitize';

type PostContentProps = {
	content: string;
};

export default function PostContent({content}: PostContentProps) {
	const safeHtml = sanitizePostHtml(content);

	return (
		<div
			className='post-content text-base leading-relaxed text-gray-800 dark:text-gray-200'
			dangerouslySetInnerHTML={{__html: safeHtml}}
		/>
	);
}

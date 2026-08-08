import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_TAGS = [
	'p',
	'br',
	'strong',
	'em',
	'u',
	's',
	'h2',
	'h3',
	'ul',
	'ol',
	'li',
	'a',
	'blockquote',
	'img',
];

const ALLOWED_ATTR = ['href', 'target', 'rel', 'src', 'alt', 'title'];

export function sanitizePostHtml(html: string): string {
	if (!html) return '';

	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS,
		ALLOWED_ATTR,
		ADD_ATTR: ['target'],
		ALLOW_DATA_ATTR: false,
	});
}

/** TipTap empty doc is often `<p></p>` — treat as empty for validation. */
export function isEmptyEditorHtml(html: string): boolean {
	const text = html
		.replace(/<[^>]*>/g, '')
		.replace(/&nbsp;/g, ' ')
		.trim();
	return text.length === 0;
}

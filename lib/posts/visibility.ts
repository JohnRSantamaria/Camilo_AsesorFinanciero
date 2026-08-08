export function isPostScheduled(post: {
	published: boolean;
	published_at: string | null;
}, now = new Date()) {
	if (!post.published || !post.published_at) return false;
	return new Date(post.published_at) > now;
}

export function isPostLive(post: {
	published: boolean;
	published_at: string | null;
}, now = new Date()) {
	if (!post.published) return false;
	if (!post.published_at) return true;
	return new Date(post.published_at) <= now;
}

/** ISO string for filtering posts visible on the public site */
export function publicVisibilityCutoffIso(now = new Date()) {
	return now.toISOString();
}

export function toDatetimeLocalValue(iso: string | null | undefined) {
	if (!iso) return '';
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return '';
	const pad = (value: number) => String(value).padStart(2, '0');
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function fromDatetimeLocalValue(value: string) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return date.toISOString();
}

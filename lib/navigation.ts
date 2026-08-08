/** Absolute home-section URL so hash links work from /blog, /privacidad, etc. */
export function homeSectionHref(hash: string) {
	const id = hash.startsWith('#') ? hash : `#${hash}`;
	return `/${id}`;
}

/** TipTap empty doc is often `<p></p>` — treat as empty for validation. */
export function isEmptyEditorHtml(html: string): boolean {
	const text = html
		.replace(/<[^>]*>/g, '')
		.replace(/&nbsp;/g, ' ')
		.trim();
	return text.length === 0;
}

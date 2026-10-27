/** TipTap empty doc is often `<p></p>` — treat as empty for validation. */
export function isEmptyEditorHtml(html: string): boolean {
	return plainTextFromHtml(html).length === 0;
}

/** Visible text for cards and meta descriptions. */
export function plainTextFromHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, ' ')
		.trim();
}

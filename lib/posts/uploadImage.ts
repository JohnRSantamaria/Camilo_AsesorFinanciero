import {createClient} from '@/lib/supabase/client';

export const BLOG_IMAGES_BUCKET = 'blog-images';
const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadBlogImage(
	file: File,
	userId: string
): Promise<{url: string} | {error: string}> {
	if (!file.type.startsWith('image/')) {
		return {error: 'Selecciona una imagen'};
	}
	if (file.size > MAX_BYTES) {
		return {error: 'Máximo 5 MB'};
	}

	const supabase = createClient();
	const ext = file.name.split('.').pop() ?? 'jpg';
	const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

	const {error} = await supabase.storage.from(BLOG_IMAGES_BUCKET).upload(path, file, {
		cacheControl: '3600',
		upsert: false,
	});

	if (error) {
		return {error: error.message};
	}

	const {
		data: {publicUrl},
	} = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path);

	return {url: publicUrl};
}

import {z} from 'zod';
import {isYouTubeUrl} from '@/lib/posts/youtube';
import {isEmptyEditorHtml} from '@/lib/posts/editorHtml';

export const postFormSchema = z.object({
	title: z.string().min(1, 'El título es requerido').max(200, 'Título muy largo'),
	slug: z
		.string()
		.min(1, 'El slug es requerido')
		.max(200, 'Slug muy largo')
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Usa solo minúsculas, números y guiones'),
	excerpt: z.string().max(500, 'Resumen muy largo').optional().or(z.literal('')),
	content: z
		.string()
		.refine((value) => !isEmptyEditorHtml(value), 'El contenido es requerido'),
	cover_image: z.union([z.string().url('URL inválida'), z.literal(''), z.null()]).optional(),
	video_url: z
		.union([
			z
				.string()
				.url('URL inválida')
				.refine(isYouTubeUrl, 'Solo URLs de YouTube (youtube.com o youtu.be)'),
			z.literal(''),
			z.null(),
		])
		.optional(),
	meta_title: z.string().max(70, 'Máximo 70 caracteres').optional().or(z.literal('')),
	meta_description: z.string().max(160, 'Máximo 160 caracteres').optional().or(z.literal('')),
	published: z.boolean(),
	published_at_local: z.string().optional().or(z.literal('')),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

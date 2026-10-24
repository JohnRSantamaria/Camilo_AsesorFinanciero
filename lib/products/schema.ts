import {z} from 'zod';

export const productFormSchema = z.object({
	title: z.string().min(1, 'El título es requerido').max(200, 'Título muy largo'),
	slug: z
		.string()
		.min(1, 'El slug es requerido')
		.max(200, 'Slug muy largo')
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Usa solo minúsculas, números y guiones'),
	description: z
		.string()
		.min(1, 'La descripción es requerida')
		.max(4000, 'Descripción muy larga'),
	cover_image: z.union([z.string().url('URL inválida'), z.literal(''), z.null()]).optional(),
	payment_url: z
		.string()
		.min(1, 'El link de pago es requerido')
		.url('URL inválida')
		.refine((value) => value.startsWith('https://'), 'El enlace debe usar HTTPS'),
	payment_label: z.string().max(60, 'Máximo 60 caracteres').optional().or(z.literal('')),
	published: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

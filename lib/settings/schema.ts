import {z} from 'zod';

export const heroCtaSchema = z.object({
	hero_cta_url: z
		.string()
		.min(1, 'El enlace es requerido')
		.url('URL inválida')
		.refine((value) => value.startsWith('https://'), 'El enlace debe usar HTTPS'),
});

export type HeroCtaFormValues = z.infer<typeof heroCtaSchema>;

import type {GetServerSideProps} from 'next';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import {requireAdmin} from '@/lib/supabase/admin';
import {createClient as createServerClient} from '@/lib/supabase/server';
import {createClient} from '@/lib/supabase/client';
import {DEFAULT_HERO_CTA_URL, HERO_CTA_SETTING_KEY} from '@/lib/settings/hero';
import {heroCtaSchema, type HeroCtaFormValues} from '@/lib/settings/schema';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

type InicioSettingsProps = {
	email: string;
	heroCtaUrl: string;
};

export default function AdminInicioPage({email, heroCtaUrl}: InicioSettingsProps) {
	const form = useForm<HeroCtaFormValues>({
		resolver: zodResolver(heroCtaSchema),
		defaultValues: {
			hero_cta_url: heroCtaUrl,
		},
	});

	const onSubmit = async (values: HeroCtaFormValues) => {
		const supabase = createClient();
		const {error} = await supabase.from('site_settings').upsert(
			{
				key: HERO_CTA_SETTING_KEY,
				value: values.hero_cta_url.trim(),
				updated_at: new Date().toISOString(),
			},
			{onConflict: 'key'}
		);

		if (error) {
			toast.error('No se pudo guardar', {description: error.message});
			return;
		}

		toast.success('Enlace del inicio actualizado');
	};

	return (
		<AdminLayout
			title='Admin — Inicio'
			email={email}
		>
			<div className='flex flex-col gap-6 max-w-3xl'>
				<div>
					<h2 className='text-2xl font-bold text-primary'>Inicio</h2>
					<p className='text-sm text-muted-foreground mt-1'>
						Destino del botón «Agenda una asesoría financiera». El texto del botón no cambia.
					</p>
				</div>
				<Card className='bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-base'>Botón del Hero</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='flex flex-col gap-6'
							>
								<FormField
									control={form.control}
									name='hero_cta_url'
									render={({field}) => (
										<FormItem>
											<FormLabel>Enlace</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder='https://mpago.li/...'
													className='bg-light dark:bg-dark'
												/>
											</FormControl>
											<FormDescription>
												Solo HTTPS. Es el destino al pulsar el botón de la portada.
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type='submit'
									disabled={form.formState.isSubmitting}
									className='w-fit font-semibold'
								>
									{form.formState.isSubmitting ? 'Guardando...' : 'Guardar enlace'}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps: GetServerSideProps<InicioSettingsProps> = async (context) => {
	const result = await requireAdmin(context);
	if (!result.ok) return result.redirect;

	const supabase = createServerClient(context);
	const {data} = await supabase
		.from('site_settings')
		.select('value')
		.eq('key', HERO_CTA_SETTING_KEY)
		.maybeSingle();

	const heroCtaUrl =
		typeof data?.value === 'string' && data.value.startsWith('https://')
			? data.value
			: DEFAULT_HERO_CTA_URL;

	return {
		props: {
			email: result.session.email,
			heroCtaUrl,
		},
	};
};

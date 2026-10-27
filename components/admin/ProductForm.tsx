import {useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {useRouter} from 'next/router';
import {createClient} from '@/lib/supabase/client';
import {productFormSchema, type ProductFormValues} from '@/lib/products/schema';
import {slugify} from '@/lib/posts/slug';
import {isEmptyEditorHtml} from '@/lib/posts/editorHtml';
import {nextSortOrder} from '@/lib/posts/reorder';
import type {Product} from '@/types/product';
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
import {Switch} from '@/components/ui/switch';
import CoverImageField from '@/components/admin/CoverImageField';
import RichTextEditor from '@/components/admin/RichTextEditor';

type ProductFormProps = {
	userId: string;
	initialProduct?: Product;
};

function isUniqueViolation(message: string) {
	return message.toLowerCase().includes('duplicate') || message.includes('products_slug_key');
}

export default function ProductForm({userId, initialProduct}: ProductFormProps) {
	const router = useRouter();
	const slugTouched = useRef(Boolean(initialProduct));

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(productFormSchema),
		defaultValues: {
			title: initialProduct?.title ?? '',
			slug: initialProduct?.slug ?? '',
			short_description: initialProduct?.short_description ?? '',
			description: initialProduct?.description ?? '',
			cover_image: initialProduct?.cover_image ?? '',
			payment_url: initialProduct?.payment_url ?? '',
			payment_label: initialProduct?.payment_label ?? '',
			published: initialProduct?.published ?? false,
		},
	});

	const titleValue = form.watch('title');

	useEffect(() => {
		if (slugTouched.current) return;
		form.setValue('slug', slugify(titleValue), {shouldValidate: false});
	}, [titleValue, form]);

	const onSubmit = async (values: ProductFormValues) => {
		const supabase = createClient();
		const cover =
			values.cover_image && values.cover_image.length > 0 ? values.cover_image : null;
		const paymentLabel =
			values.payment_label && values.payment_label.trim().length > 0
				? values.payment_label.trim()
				: null;

		const payload = {
			title: values.title.trim(),
			slug: values.slug.trim(),
			short_description: isEmptyEditorHtml(values.short_description)
				? ''
				: values.short_description,
			description: isEmptyEditorHtml(values.description) ? '' : values.description,
			cover_image: cover,
			payment_url: values.payment_url.trim(),
			payment_label: paymentLabel,
			published: values.published,
			updated_at: new Date().toISOString(),
		};

		try {
			if (initialProduct) {
				const {error} = await supabase
					.from('products')
					.update(payload)
					.eq('id', initialProduct.id);
				if (error) {
					if (isUniqueViolation(error.message)) {
						form.setError('slug', {message: 'Este slug ya está en uso'});
						toast.error('Slug duplicado', {description: 'Elige otro slug'});
						return;
					}
					toast.error('Error al actualizar', {description: error.message});
					return;
				}
				toast.success('Producto actualizado');
			} else {
				const sortOrder = await nextSortOrder('products');
				const {data, error} = await supabase
					.from('products')
					.insert({...payload, sort_order: sortOrder})
					.select('id')
					.single();
				if (error) {
					if (isUniqueViolation(error.message)) {
						form.setError('slug', {message: 'Este slug ya está en uso'});
						toast.error('Slug duplicado', {description: 'Elige otro slug'});
						return;
					}
					toast.error('Error al crear', {description: error.message});
					return;
				}
				toast.success('Producto creado');
				await router.push(`/admin/products/${data.id}`);
				return;
			}
			await router.push('/admin/products');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Error inesperado';
			toast.error('Error', {description: message});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-6'
			>
				<FormField
					control={form.control}
					name='title'
					render={({field}) => (
						<FormItem>
							<FormLabel>Título</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-light dark:bg-dark'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='slug'
					render={({field}) => (
						<FormItem>
							<FormLabel>Slug</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-light dark:bg-dark'
									onChange={(event) => {
										slugTouched.current = true;
										field.onChange(event);
									}}
								/>
							</FormControl>
							<FormDescription>URL de la ficha, ej. mi-libro</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='short_description'
					render={({field}) => (
						<FormItem>
							<FormLabel>Descripción corta</FormLabel>
							<FormControl>
								<RichTextEditor
									value={field.value}
									onChange={field.onChange}
									userId={userId}
								/>
							</FormControl>
							<FormDescription>
								Se muestra en la tarjeta de /libro, antes de abrir la ficha. Mismo formato que
								la descripción, sin límite de caracteres.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='description'
					render={({field}) => (
						<FormItem>
							<FormLabel>Descripción</FormLabel>
							<FormControl>
								<RichTextEditor
									value={field.value}
									onChange={field.onChange}
									userId={userId}
								/>
							</FormControl>
							<FormDescription>
								Se muestra al abrir la ficha del libro. Mismo formato, sin límite de caracteres.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='cover_image'
					render={({field}) => (
						<FormItem>
							<FormControl>
								<CoverImageField
									userId={userId}
									label='Imagen del libro'
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='payment_url'
					render={({field}) => (
						<FormItem>
							<FormLabel>Link de pago (Mercado Pago)</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder='https://mpago.la/...'
									className='bg-light dark:bg-dark'
								/>
							</FormControl>
							<FormDescription>
								Solo HTTPS. El botón abre el checkout en una pestaña nueva.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='payment_label'
					render={({field}) => (
						<FormItem>
							<FormLabel>Texto del botón</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value ?? ''}
									maxLength={60}
									placeholder='Comprar ahora'
									className='bg-light dark:bg-dark'
								/>
							</FormControl>
							<FormDescription>
								{(field.value ?? '').length}/60 · Si lo dejas vacío se muestra «Comprar
								ahora».
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='published'
					render={({field}) => (
						<FormItem className='flex flex-row items-center justify-between rounded-lg border border-border bg-stone-200/50 dark:bg-zinc-800/50 p-4'>
							<div className='space-y-0.5'>
								<FormLabel>Publicado</FormLabel>
								<FormDescription>
									Si está activo, el producto aparece en /libro.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className='flex flex-wrap gap-3'>
					<Button
						type='submit'
						disabled={form.formState.isSubmitting}
						className='font-semibold'
					>
						{form.formState.isSubmitting
							? 'Guardando...'
							: initialProduct
								? 'Guardar cambios'
								: 'Crear producto'}
					</Button>
					<Button
						type='button'
						variant='outline'
						onClick={() => router.push('/admin/products')}
					>
						Cancelar
					</Button>
				</div>
			</form>
		</Form>
	);
}

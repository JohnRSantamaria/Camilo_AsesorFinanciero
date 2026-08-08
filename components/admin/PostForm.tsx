import {useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'sonner';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {createClient} from '@/lib/supabase/client';
import {postFormSchema, type PostFormValues} from '@/lib/posts/schema';
import {slugify} from '@/lib/posts/slug';
import type {Post} from '@/types/post';
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
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import CoverImageField from '@/components/admin/CoverImageField';
import RichTextEditor from '@/components/admin/RichTextEditor';
import {isEmptyEditorHtml} from '@/lib/posts/editorHtml';
import {nextSortOrder} from '@/lib/posts/reorder';
import {fromDatetimeLocalValue, toDatetimeLocalValue} from '@/lib/posts/visibility';

type PostFormProps = {
	userId: string;
	initialPost?: Post;
};

function isUniqueViolation(message: string) {
	return message.toLowerCase().includes('duplicate') || message.includes('posts_slug_key');
}

function nowDatetimeLocal() {
	return toDatetimeLocalValue(new Date().toISOString());
}

export default function PostForm({userId, initialPost}: PostFormProps) {
	const router = useRouter();
	const slugTouched = useRef(Boolean(initialPost));

	const form = useForm<PostFormValues>({
		resolver: zodResolver(postFormSchema),
		defaultValues: {
			title: initialPost?.title ?? '',
			slug: initialPost?.slug ?? '',
			excerpt: initialPost?.excerpt ?? '',
			content: initialPost?.content ?? '',
			cover_image: initialPost?.cover_image ?? '',
			video_url: initialPost?.video_url ?? '',
			meta_title: initialPost?.meta_title ?? '',
			meta_description: initialPost?.meta_description ?? '',
			published: initialPost?.published ?? false,
			published_at_local: initialPost?.published_at
				? toDatetimeLocalValue(initialPost.published_at)
				: '',
		},
	});

	const titleValue = form.watch('title');
	const slugValue = form.watch('slug');
	const excerptValue = form.watch('excerpt');
	const metaTitleValue = form.watch('meta_title');
	const metaDescriptionValue = form.watch('meta_description');
	const publishedValue = form.watch('published');

	useEffect(() => {
		if (slugTouched.current) return;
		form.setValue('slug', slugify(titleValue), {shouldValidate: false});
	}, [titleValue, form]);

	useEffect(() => {
		if (!publishedValue) return;
		const current = form.getValues('published_at_local');
		if (!current) {
			form.setValue('published_at_local', nowDatetimeLocal());
		}
	}, [publishedValue, form]);

	const seoTitle = (metaTitleValue && metaTitleValue.trim()) || titleValue || 'Sin título';
	const seoDescription =
		(metaDescriptionValue && metaDescriptionValue.trim()) ||
		(excerptValue && excerptValue.trim()) ||
		'Tu descripción aparecerá aquí';

	const onSubmit = async (values: PostFormValues) => {
		const supabase = createClient();
		const cover =
			values.cover_image && values.cover_image.length > 0 ? values.cover_image : null;
		const excerpt = values.excerpt && values.excerpt.length > 0 ? values.excerpt : null;
		const videoUrl =
			values.video_url && values.video_url.length > 0 ? values.video_url.trim() : null;
		const metaTitle =
			values.meta_title && values.meta_title.trim().length > 0
				? values.meta_title.trim()
				: null;
		const metaDescription =
			values.meta_description && values.meta_description.trim().length > 0
				? values.meta_description.trim()
				: null;

		let publishedAt: string | null = null;
		if (values.published) {
			publishedAt =
				fromDatetimeLocalValue(values.published_at_local || nowDatetimeLocal()) ??
				new Date().toISOString();
		}

		const payload = {
			title: values.title.trim(),
			slug: values.slug.trim(),
			excerpt,
			content: isEmptyEditorHtml(values.content) ? '' : values.content,
			cover_image: cover,
			video_url: videoUrl,
			meta_title: metaTitle,
			meta_description: metaDescription,
			published: values.published,
			published_at: publishedAt,
		};

		try {
			if (initialPost) {
				const {error} = await supabase.from('posts').update(payload).eq('id', initialPost.id);
				if (error) {
					if (isUniqueViolation(error.message)) {
						form.setError('slug', {message: 'Este slug ya está en uso'});
						toast.error('Slug duplicado', {description: 'Elige otro slug'});
						return;
					}
					toast.error('Error al actualizar', {description: error.message});
					return;
				}
				toast.success('Post actualizado');
			} else {
				const sortOrder = await nextSortOrder();
				const {data, error} = await supabase
					.from('posts')
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
				toast.success('Post creado');
				await router.push(`/admin/posts/${data.id}`);
				return;
			}
			await router.push('/admin/posts');
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
							<FormDescription>URL amigable, ej. mi-primer-post</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='excerpt'
					render={({field}) => (
						<FormItem>
							<FormLabel>Resumen</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									rows={3}
									maxLength={500}
									className='bg-light dark:bg-dark'
								/>
							</FormControl>
							<FormDescription>
								{(field.value ?? '').length}/500
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='content'
					render={({field}) => (
						<FormItem>
							<FormLabel>Contenido</FormLabel>
							<FormControl>
								<RichTextEditor
									value={field.value}
									onChange={field.onChange}
									userId={userId}
								/>
							</FormControl>
							<FormDescription>
								Usa la barra de herramientas para dar formato. Se guarda como HTML seguro.
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
					name='video_url'
					render={({field}) => (
						<FormItem>
							<FormLabel>URL del video (YouTube)</FormLabel>
							<FormControl>
								<Input
									{...field}
									value={field.value ?? ''}
									placeholder='https://www.youtube.com/watch?v=...'
									className='bg-light dark:bg-dark'
								/>
							</FormControl>
							<FormDescription>
								Opcional. El video se reproduce embebido en el blog; las vistas cuentan en
								YouTube.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='rounded-lg border border-border bg-stone-200/50 dark:bg-zinc-800/50 p-4 flex flex-col gap-4'>
					<div>
						<p className='text-sm font-semibold text-foreground'>SEO</p>
						<p className='text-xs text-muted-foreground mt-1'>
							Opcional. Si los dejas vacíos se usan el título y el resumen.
						</p>
					</div>

					<FormField
						control={form.control}
						name='meta_title'
						render={({field}) => (
							<FormItem>
								<FormLabel>Meta título</FormLabel>
								<FormControl>
									<Input
										{...field}
										value={field.value ?? ''}
										maxLength={70}
										className='bg-light dark:bg-dark'
									/>
								</FormControl>
								<FormDescription>
									{(field.value ?? '').length}/70 · Ideal ~50–60 caracteres
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='meta_description'
						render={({field}) => (
							<FormItem>
								<FormLabel>Meta descripción</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										value={field.value ?? ''}
										rows={3}
										maxLength={160}
										className='bg-light dark:bg-dark'
									/>
								</FormControl>
								<FormDescription>
									{(field.value ?? '').length}/160 · Ideal ~120–160 caracteres
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='rounded-md border border-border bg-light dark:bg-dark p-3'>
						<p className='text-xs text-muted-foreground mb-2'>Vista previa en buscadores</p>
						<p className='text-base text-blue-700 dark:text-blue-400 truncate'>{seoTitle}</p>
						<p className='text-xs text-emerald-700 dark:text-emerald-400 truncate mt-0.5'>
							camilomeza.com/blog/{slugValue || 'slug'}
						</p>
						<p className='text-sm text-muted-foreground mt-1 line-clamp-2 whitespace-pre-line'>
							{seoDescription}
						</p>
					</div>
				</div>

				<FormField
					control={form.control}
					name='published'
					render={({field}) => (
						<FormItem className='flex flex-row items-center justify-between rounded-lg border border-border bg-stone-200/50 dark:bg-zinc-800/50 p-4'>
							<div className='space-y-0.5'>
								<FormLabel>Publicado</FormLabel>
								<FormDescription>
									Si está activo, el post será visible en el blog según la fecha de
									publicación.
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

				{publishedValue ? (
					<FormField
						control={form.control}
						name='published_at_local'
						render={({field}) => (
							<FormItem>
								<FormLabel>Fecha de publicación</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='datetime-local'
										value={field.value ?? ''}
										className='bg-light dark:bg-dark max-w-xs'
									/>
								</FormControl>
								<FormDescription>
									Fecha futura = programado (no visible hasta entonces).
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				) : null}

				<div className='flex flex-wrap gap-3'>
					<Button
						type='submit'
						disabled={form.formState.isSubmitting}
						className='font-semibold'
					>
						{form.formState.isSubmitting
							? 'Guardando...'
							: initialPost
								? 'Guardar cambios'
								: 'Crear post'}
					</Button>
					{initialPost ? (
						<Button
							type='button'
							variant='outline'
							asChild
						>
							<Link href={`/admin/posts/${initialPost.id}/preview`}>Vista previa</Link>
						</Button>
					) : null}
					<Button
						type='button'
						variant='outline'
						onClick={() => router.push('/admin/posts')}
					>
						Cancelar
					</Button>
				</div>
			</form>
		</Form>
	);
}

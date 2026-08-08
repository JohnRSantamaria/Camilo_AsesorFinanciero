import {useState} from 'react';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {BLOG_IMAGES_BUCKET, uploadBlogImage} from '@/lib/posts/uploadImage';

type CoverImageFieldProps = {
	value: string | null | undefined;
	onChange: (url: string) => void;
	userId: string;
};

export default function CoverImageField({value, onChange, userId}: CoverImageFieldProps) {
	const [isUploading, setIsUploading] = useState(false);

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setIsUploading(true);
		try {
			const result = await uploadBlogImage(file, userId);
			if ('error' in result) {
				toast.error('Error al subir imagen', {description: result.error});
				return;
			}
			onChange(result.url);
			toast.success('Portada subida');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Error inesperado';
			toast.error('Error al subir imagen', {description: message});
		} finally {
			setIsUploading(false);
			event.target.value = '';
		}
	};

	return (
		<div className='grid gap-3'>
			<Label>Imagen de portada</Label>
			{value ? (
				<div className='relative w-full max-w-md overflow-hidden rounded-lg border border-border'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={value}
						alt='Portada del post'
						className='h-40 w-full object-cover'
					/>
					<div className='flex gap-2 p-2'>
						<Button
							type='button'
							variant='outline'
							size='sm'
							onClick={() => onChange('')}
						>
							Quitar
						</Button>
					</div>
				</div>
			) : null}
			<div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
				<Input
					type='file'
					accept='image/jpeg,image/png,image/webp,image/gif'
					disabled={isUploading}
					onChange={handleFileChange}
					className='bg-light dark:bg-dark max-w-md'
				/>
				{isUploading ? (
					<span className='text-sm text-muted-foreground'>Subiendo...</span>
				) : null}
			</div>
			<p className='text-xs text-muted-foreground'>
				Bucket Storage: <code>{BLOG_IMAGES_BUCKET}</code> (público). Máx. 5 MB.
			</p>
		</div>
	);
}

'use client';

import {useEffect, useRef, useState} from 'react';
import {useEditor, EditorContent} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
	Bold,
	Italic,
	Heading2,
	Heading3,
	List,
	ListOrdered,
	ImageIcon,
	Undo2,
	Redo2,
	Loader2,
} from 'lucide-react';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {uploadBlogImage} from '@/lib/posts/uploadImage';

type RichTextEditorProps = {
	value: string;
	onChange: (html: string) => void;
	userId: string;
	disabled?: boolean;
};

function ToolbarButton({
	onClick,
	active,
	label,
	children,
	disabled,
}: {
	onClick: () => void;
	active?: boolean;
	label: string;
	children: React.ReactNode;
	disabled?: boolean;
}) {
	return (
		<Button
			type='button'
			variant={active ? 'default' : 'outline'}
			size='sm'
			aria-label={label}
			title={label}
			onClick={onClick}
			disabled={disabled}
			className='h-8 w-8 p-0'
		>
			{children}
		</Button>
	);
}

export default function RichTextEditor({value, onChange, userId, disabled}: RichTextEditorProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isUploading, setIsUploading] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {levels: [2, 3]},
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					rel: 'noopener noreferrer',
					target: '_blank',
				},
			}),
			Image.configure({
				allowBase64: false,
				HTMLAttributes: {
					class: 'rounded-lg max-w-full h-auto',
				},
			}),
			Placeholder.configure({
				placeholder: 'Escribe el contenido del artículo…',
			}),
		],
		content: value || '',
		editable: !disabled,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class: cn(
					'prose-editor min-h-[240px] max-w-none px-3 py-2 focus:outline-none',
					'bg-light dark:bg-dark rounded-b-lg'
				),
			},
		},
		onUpdate: ({editor: current}) => {
			onChange(current.getHTML());
		},
	});

	useEffect(() => {
		if (!editor) return;
		const current = editor.getHTML();
		if (value !== current && value !== undefined) {
			editor.commands.setContent(value || '', {emitUpdate: false});
		}
	}, [value, editor]);

	useEffect(() => {
		if (!editor) return;
		editor.setEditable(!disabled);
	}, [disabled, editor]);

	if (!editor) {
		return (
			<div className='min-h-[280px] rounded-lg border border-border bg-light dark:bg-dark animate-pulse' />
		);
	}

	const handleImageFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		event.target.value = '';
		if (!file) return;

		setIsUploading(true);
		try {
			const result = await uploadBlogImage(file, userId);
			if ('error' in result) {
				toast.error('Error al subir imagen', {description: result.error});
				return;
			}
			editor.chain().focus().setImage({src: result.url, alt: file.name}).run();
			toast.success('Imagen insertada');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Error inesperado';
			toast.error('Error al subir imagen', {description: message});
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className='rounded-lg border border-border overflow-hidden'>
			<input
				ref={fileInputRef}
				type='file'
				accept='image/jpeg,image/png,image/webp,image/gif'
				className='hidden'
				onChange={handleImageFile}
			/>
			<div className='flex flex-wrap gap-1 border-b border-border bg-stone-200/80 dark:bg-zinc-800/80 p-2'>
				<ToolbarButton
					label='Negrita'
					active={editor.isActive('bold')}
					onClick={() => editor.chain().focus().toggleBold().run()}
				>
					<Bold className='size-4' />
				</ToolbarButton>
				<ToolbarButton
					label='Cursiva'
					active={editor.isActive('italic')}
					onClick={() => editor.chain().focus().toggleItalic().run()}
				>
					<Italic className='size-4' />
				</ToolbarButton>
				<ToolbarButton
					label='Título 2'
					active={editor.isActive('heading', {level: 2})}
					onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
				>
					<Heading2 className='size-4' />
				</ToolbarButton>
				<ToolbarButton
					label='Título 3'
					active={editor.isActive('heading', {level: 3})}
					onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
				>
					<Heading3 className='size-4' />
				</ToolbarButton>
				<ToolbarButton
					label='Lista'
					active={editor.isActive('bulletList')}
					onClick={() => editor.chain().focus().toggleBulletList().run()}
				>
					<List className='size-4' />
				</ToolbarButton>
				<ToolbarButton
					label='Lista numerada'
					active={editor.isActive('orderedList')}
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
				>
					<ListOrdered className='size-4' />
				</ToolbarButton>
				<ToolbarButton
					label='Insertar imagen'
					disabled={isUploading || disabled}
					onClick={() => fileInputRef.current?.click()}
				>
					{isUploading ? (
						<Loader2 className='size-4 animate-spin' />
					) : (
						<ImageIcon className='size-4' />
					)}
				</ToolbarButton>
				<ToolbarButton
					label='Deshacer'
					onClick={() => editor.chain().focus().undo().run()}
				>
					<Undo2 className='size-4' />
				</ToolbarButton>
				<ToolbarButton
					label='Rehacer'
					onClick={() => editor.chain().focus().redo().run()}
				>
					<Redo2 className='size-4' />
				</ToolbarButton>
			</div>
			<EditorContent editor={editor} />
		</div>
	);
}

import {useState} from 'react';
import type {GetServerSideProps} from 'next';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {toast} from 'sonner';
import {ChevronDown, ChevronUp} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import {requireAdmin} from '@/lib/supabase/admin';
import {createClient} from '@/lib/supabase/server';
import {createClient as createBrowserClient} from '@/lib/supabase/client';
import {swapSortOrder} from '@/lib/posts/reorder';
import type {Product} from '@/types/product';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

type ProductsListProps = {
	email: string;
	products: Product[];
};

function formatDate(value: string) {
	return new Date(value).toLocaleDateString('es-CO', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}

export default function AdminProductsPage({email, products}: ProductsListProps) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [reorderingId, setReorderingId] = useState<string | null>(null);

	const handleDelete = async (id: string) => {
		setDeletingId(id);
		try {
			const supabase = createBrowserClient();
			const {error} = await supabase.from('products').delete().eq('id', id);
			if (error) {
				toast.error('Error al eliminar', {description: error.message});
				return;
			}
			toast.success('Producto eliminado');
			await router.replace(router.asPath);
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Error inesperado';
			toast.error('Error al eliminar', {description: message});
		} finally {
			setDeletingId(null);
		}
	};

	const handleMove = async (index: number, direction: 'up' | 'down') => {
		const neighborIndex = direction === 'up' ? index - 1 : index + 1;
		if (neighborIndex < 0 || neighborIndex >= products.length) return;

		const current = products[index];
		const neighbor = products[neighborIndex];
		setReorderingId(current.id);
		try {
			const {error} = await swapSortOrder(current, neighbor, 'products');
			if (error) {
				toast.error('No se pudo reordenar', {description: error});
				return;
			}
			await router.replace(router.asPath);
		} finally {
			setReorderingId(null);
		}
	};

	return (
		<AdminLayout
			title='Admin — Productos'
			email={email}
		>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<h2 className='text-2xl font-bold text-primary'>Productos</h2>
						<p className='text-sm text-muted-foreground mt-1'>
							Libros y otros pagos. Usa ↑ / ↓ para el orden en /libro.
						</p>
					</div>
					<Button
						asChild
						className='font-semibold'
					>
						<Link href='/admin/products/new'>Nuevo producto</Link>
					</Button>
				</div>

				<Card className='bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm overflow-hidden'>
					<CardHeader>
						<CardTitle className='text-base'>Listado</CardTitle>
					</CardHeader>
					<CardContent className='p-0 sm:p-4 pt-0'>
						{products.length === 0 ? (
							<p className='text-sm text-muted-foreground px-4 pb-4'>
								Aún no hay productos.{' '}
								<Link
									href='/admin/products/new'
									className='text-primary underline'
								>
									Crea el primero
								</Link>
								.
							</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className='w-20'>Orden</TableHead>
										<TableHead>Título</TableHead>
										<TableHead className='hidden md:table-cell'>Slug</TableHead>
										<TableHead>Estado</TableHead>
										<TableHead className='hidden sm:table-cell'>Actualizado</TableHead>
										<TableHead className='text-right'>Acciones</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{products.map((product, index) => (
										<TableRow key={product.id}>
											<TableCell>
												<div className='flex items-center gap-1'>
													<Button
														type='button'
														variant='outline'
														size='icon'
														className='h-8 w-8'
														disabled={index === 0 || reorderingId === product.id}
														aria-label='Subir'
														onClick={() => handleMove(index, 'up')}
													>
														<ChevronUp className='h-4 w-4' />
													</Button>
													<Button
														type='button'
														variant='outline'
														size='icon'
														className='h-8 w-8'
														disabled={
															index === products.length - 1 || reorderingId === product.id
														}
														aria-label='Bajar'
														onClick={() => handleMove(index, 'down')}
													>
														<ChevronDown className='h-4 w-4' />
													</Button>
												</div>
											</TableCell>
											<TableCell className='font-medium max-w-[200px] truncate'>
												{product.title}
											</TableCell>
											<TableCell className='hidden md:table-cell text-muted-foreground'>
												{product.slug}
											</TableCell>
											<TableCell>
												<Badge variant={product.published ? 'success' : 'muted'}>
													{product.published ? 'Publicado' : 'Borrador'}
												</Badge>
											</TableCell>
											<TableCell className='hidden sm:table-cell text-muted-foreground'>
												{formatDate(product.updated_at)}
											</TableCell>
											<TableCell className='text-right'>
												<div className='flex justify-end gap-2 flex-wrap'>
													<Button
														asChild
														variant='outline'
														size='sm'
													>
														<Link href={`/admin/products/${product.id}`}>Editar</Link>
													</Button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button
																variant='destructive'
																size='sm'
																disabled={deletingId === product.id}
															>
																Eliminar
															</Button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
																<AlertDialogDescription>
																	Se eliminará permanentemente «{product.title}». Esta acción no
																	se puede deshacer.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancelar</AlertDialogCancel>
																<AlertDialogAction
																	className='bg-red-500 hover:bg-red-600'
																	onClick={() => handleDelete(product.id)}
																>
																	Eliminar
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps: GetServerSideProps<ProductsListProps> = async (context) => {
	const result = await requireAdmin(context);
	if (!result.ok) return result.redirect;

	const supabase = createClient(context);
	const {data, error} = await supabase
		.from('products')
		.select('*')
		.order('sort_order', {ascending: true});

	if (error) {
		return {
			props: {
				email: result.session.email,
				products: [],
			},
		};
	}

	return {
		props: {
			email: result.session.email,
			products: (data ?? []) as Product[],
		},
	};
};

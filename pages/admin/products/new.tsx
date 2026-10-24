import type {GetServerSideProps} from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductForm from '@/components/admin/ProductForm';
import {requireAdmin} from '@/lib/supabase/admin';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

type NewProductPageProps = {
	email: string;
	userId: string;
};

export default function NewProductPage({email, userId}: NewProductPageProps) {
	return (
		<AdminLayout
			title='Admin — Nuevo producto'
			email={email}
		>
			<div className='flex flex-col gap-6 max-w-3xl'>
				<div>
					<h2 className='text-2xl font-bold text-primary'>Nuevo producto</h2>
					<p className='text-sm text-muted-foreground mt-1'>
						Imagen, descripción y link de pago. No es un artículo del blog.
					</p>
				</div>
				<Card className='bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-base'>Producto</CardTitle>
					</CardHeader>
					<CardContent>
						<ProductForm userId={userId} />
					</CardContent>
				</Card>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps: GetServerSideProps<NewProductPageProps> = async (context) => {
	const result = await requireAdmin(context);
	if (!result.ok) return result.redirect;

	return {
		props: {
			email: result.session.email,
			userId: result.session.user.id,
		},
	};
};

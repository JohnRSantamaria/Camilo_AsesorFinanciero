import type {GetServerSideProps} from 'next';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductForm from '@/components/admin/ProductForm';
import {requireAdmin} from '@/lib/supabase/admin';
import {createClient} from '@/lib/supabase/server';
import type {Product} from '@/types/product';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

type EditProductPageProps = {
	email: string;
	userId: string;
	product: Product;
};

export default function EditProductPage({email, userId, product}: EditProductPageProps) {
	return (
		<AdminLayout
			title={`Admin — ${product.title}`}
			email={email}
		>
			<div className='flex flex-col gap-6 max-w-3xl'>
				<div>
					<h2 className='text-2xl font-bold text-primary'>Editar producto</h2>
					<p className='text-sm text-muted-foreground mt-1'>/libro/{product.slug}</p>
				</div>
				<Card className='bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm'>
					<CardHeader>
						<CardTitle className='text-base'>Producto</CardTitle>
					</CardHeader>
					<CardContent>
						<ProductForm
							userId={userId}
							initialProduct={product}
						/>
					</CardContent>
				</Card>
			</div>
		</AdminLayout>
	);
}

export const getServerSideProps: GetServerSideProps<EditProductPageProps> = async (context) => {
	const result = await requireAdmin(context);
	if (!result.ok) return result.redirect;

	const id = context.params?.id;
	if (typeof id !== 'string') {
		return {notFound: true};
	}

	const supabase = createClient(context);
	const {data, error} = await supabase.from('products').select('*').eq('id', id).maybeSingle();

	if (error || !data) {
		return {notFound: true};
	}

	return {
		props: {
			email: result.session.email,
			userId: result.session.user.id,
			product: data as Product,
		},
	};
};

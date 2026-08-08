import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {Raleway} from 'next/font/google';
import {toast} from 'sonner';
import {createClient} from '@/lib/supabase/client';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const raleway = Raleway({subsets: ['latin']});

async function userIsAdmin(userId: string) {
	const supabase = createClient();
	const {data, error} = await supabase
		.from('admin_users')
		.select('role')
		.eq('user_id', userId)
		.maybeSingle();

	if (error) {
		return {ok: false as const, reason: error.message};
	}

	const role = data?.role;
	if (role === 'owner' || role === 'admin') {
		return {ok: true as const, role};
	}

	return {
		ok: false as const,
		reason:
			'Tu cuenta no está en admin_users (owner/admin). Agrega tu user_id en Supabase o revisa las políticas RLS de lectura.',
	};
}

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (router.query.error === 'unauthorized') {
			toast.error('Acceso denegado', {
				description:
					'Tu usuario autenticó bien, pero no tiene rol admin. Revisa la tabla admin_users y el RLS.',
			});
			router.replace('/admin/login', undefined, {shallow: true});
		}
	}, [router]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);

		try {
			const supabase = createClient();
			const {data, error} = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				toast.error('Error al iniciar sesión', {description: error.message});
				return;
			}

			const userId = data.user?.id;
			if (!userId) {
				toast.error('Error al iniciar sesión', {description: 'No se obtuvo el usuario'});
				return;
			}

			const adminCheck = await userIsAdmin(userId);
			if (!adminCheck.ok) {
				await supabase.auth.signOut();
				toast.error('Acceso denegado', {description: adminCheck.reason});
				return;
			}

			await router.push('/admin');
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Error inesperado';
			toast.error('Error al iniciar sesión', {description: message});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Head>
				<title>Admin — Iniciar sesión</title>
			</Head>
			<main
				className={`${raleway.className} min-h-screen flex items-center justify-center bg-light dark:bg-dark px-4`}
			>
				<Card className='w-full max-w-md bg-stone-200 dark:bg-zinc-800 shadow-md border-0 ring-0'>
					<CardHeader>
						<CardTitle className='text-2xl font-bold text-primary'>
							Panel de administración
						</CardTitle>
						<CardDescription className='text-gray-600 dark:text-gray-300'>
							Ingresa con tu cuenta de administrador
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit}
							className='flex flex-col gap-4'
						>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Correo electrónico</Label>
								<Input
									id='email'
									type='email'
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									required
									autoComplete='email'
									className='bg-light dark:bg-dark'
								/>
							</div>

							<div className='grid gap-2'>
								<Label htmlFor='password'>Contraseña</Label>
								<Input
									id='password'
									type='password'
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									required
									autoComplete='current-password'
									className='bg-light dark:bg-dark'
								/>
							</div>

							<Button
								type='submit'
								disabled={isSubmitting}
								className='mt-2 w-full font-semibold'
							>
								{isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
							</Button>
						</form>
					</CardContent>
				</Card>
			</main>
		</>
	);
}

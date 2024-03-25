import Head from 'next/head';
import {useRouter} from 'next/router';

export default function Custom404() {
	const router = useRouter();

	const goBack = () => {
		router.push('/');
	};

	return (
		<main className='flex flex-col items-center justify-center gap-4 p-4 text-primary bg-light dark:bg-darks w-full h-screen'>
			<h1 className='text-4xl text-center '>404 - Page Not Found</h1>
			<p className='text-center'>Esta pagina no esta disponible</p>
			<button
				onClick={goBack}
				className='underline underline-offset-4 active:scale-95 hover:opacity-70'
			>
				Regresar a la pagina principal
			</button>
		</main>
	);
}

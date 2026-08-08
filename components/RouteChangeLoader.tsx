import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

export default function RouteChangeLoader() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const handleStart = (url: string) => {
			if (url.startsWith('/admin')) return;
			setIsLoading(true);
		};

		const handleStop = () => {
			setIsLoading(false);
		};

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleStop);
		router.events.on('routeChangeError', handleStop);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleStop);
			router.events.off('routeChangeError', handleStop);
		};
	}, [router.events]);

	if (!isLoading) return null;

	return (
		<div
			role='progressbar'
			aria-busy='true'
			aria-label='Cargando página'
			className='fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-primary/20'
		>
			<div className='h-full w-1/3 animate-[routeLoader_1s_ease-in-out_infinite] bg-primary' />
		</div>
	);
}

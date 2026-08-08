import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {
	CONSENT_CHANGED_EVENT,
	getConsent,
	setConsent,
	type CookieConsentValue,
} from '@/lib/consent';
import {disableGoogleAnalytics, enableGoogleAnalytics} from '@/lib/analytics';
import {Button} from '@/components/ui/button';

export default function CookieConsent() {
	const router = useRouter();
	const [visible, setVisible] = useState(false);

	const isAdminRoute = router.pathname.startsWith('/admin');

	useEffect(() => {
		if (isAdminRoute) {
			setVisible(false);
			return;
		}

		const sync = () => {
			setVisible(getConsent() === null);
		};

		sync();
		window.addEventListener(CONSENT_CHANGED_EVENT, sync);
		return () => window.removeEventListener(CONSENT_CHANGED_EVENT, sync);
	}, [isAdminRoute]);

	const handleChoice = async (value: CookieConsentValue) => {
		setConsent(value);
		setVisible(false);
		if (value === 'accepted') {
			try {
				await enableGoogleAnalytics();
			} catch {
				// Measurement ID missing or network error — site still works
			}
		} else {
			disableGoogleAnalytics();
		}
	};

	if (isAdminRoute || !visible) return null;

	return (
		<div
			role='dialog'
			aria-label='Consentimiento de cookies'
			className='fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6'
		>
			<div className='mx-auto max-w-3xl rounded-lg border border-border bg-stone-200 dark:bg-zinc-800 shadow-lg p-4 sm:p-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
				<div className='text-sm text-foreground space-y-2'>
					<p className='font-semibold text-primary'>Cookies y analítica</p>
					<p className='text-muted-foreground'>
						Usamos cookies técnicas necesarias y, solo si aceptas, Google Analytics para
						entender el uso del sitio (páginas visitadas y clics de contacto). Puedes
						rechazar sin afectar la navegación.{' '}
						<Link
							href='/privacidad'
							className='underline text-primary'
						>
							Política de privacidad
						</Link>
					</p>
				</div>
				<div className='flex flex-wrap gap-2 shrink-0'>
					<Button
						type='button'
						variant='outline'
						onClick={() => handleChoice('rejected')}
					>
						Rechazar
					</Button>
					<Button
						type='button'
						className='font-semibold'
						onClick={() => handleChoice('accepted')}
					>
						Aceptar
					</Button>
				</div>
			</div>
		</div>
	);
}

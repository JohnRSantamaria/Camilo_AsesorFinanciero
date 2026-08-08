import {useEffect} from 'react';
import {useRouter} from 'next/router';
import type {AppProps} from 'next/app';
import '@/styles/globals.css';
import {Toaster} from '@/components/ui/sonner';
import CookieConsent from '@/components/CookieConsent';
import {
	CONSENT_CHANGED_EVENT,
	getConsent,
	hasAnalyticsConsent,
} from '@/lib/consent';
import {
	disableGoogleAnalytics,
	enableGoogleAnalytics,
	GA_MEASUREMENT_ID,
	initConsentDefaults,
	pageview,
} from '@/lib/analytics';

export default function App({Component, pageProps}: AppProps) {
	const router = useRouter();

	// Init consent defaults once; enable GA if already accepted
	useEffect(() => {
		if (!GA_MEASUREMENT_ID) return;
		if (router.pathname.startsWith('/admin')) return;

		initConsentDefaults();
		if (hasAnalyticsConsent()) {
			void enableGoogleAnalytics();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps -- mount once for public pages
	}, []);

	useEffect(() => {
		if (!GA_MEASUREMENT_ID) return;

		const handleConsentChange = () => {
			const consent = getConsent();
			if (consent === 'accepted') {
				void enableGoogleAnalytics();
			} else {
				disableGoogleAnalytics();
			}
		};

		window.addEventListener(CONSENT_CHANGED_EVENT, handleConsentChange);
		return () => window.removeEventListener(CONSENT_CHANGED_EVENT, handleConsentChange);
	}, []);

	useEffect(() => {
		if (!GA_MEASUREMENT_ID) return;

		const handleRouteChange = (url: string) => {
			if (!hasAnalyticsConsent()) return;
			if (url.startsWith('/admin')) return;
			pageview(url);
		};

		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			<Component {...pageProps} />
			<CookieConsent />
			<Toaster />
		</>
	);
}

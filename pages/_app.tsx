import {useEffect} from 'react';
import {useRouter} from 'next/router';
import type {AppProps} from 'next/app';
import {Analytics} from '@vercel/analytics/next';
import {SpeedInsights} from '@vercel/speed-insights/next';
import '@/styles/globals.css';
import {Toaster} from '@/components/ui/sonner';
import CookieConsent from '@/components/CookieConsent';
import RouteChangeLoader from '@/components/RouteChangeLoader';
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
import {PREV_ROUTE_KEY} from '@/lib/navigation/smartBack';

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
		const handleRouteChangeStart = () => {
			try {
				sessionStorage.setItem(PREV_ROUTE_KEY, router.asPath);
			} catch {
				// sessionStorage may be unavailable (private mode / quota)
			}
		};

		router.events.on('routeChangeStart', handleRouteChangeStart);
		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart);
		};
	}, [router.asPath, router.events]);

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
			<RouteChangeLoader />
			<Component {...pageProps} />
			<CookieConsent />
			<Toaster />
			<Analytics />
			<SpeedInsights />
		</>
	);
}

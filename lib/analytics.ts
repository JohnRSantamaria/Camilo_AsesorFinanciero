import {hasAnalyticsConsent} from '@/lib/consent';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

type GtagFn = (...args: unknown[]) => void;

declare global {
	interface Window {
		dataLayer?: IArguments[] | unknown[];
		gtag?: GtagFn;
		__gaLoaded?: boolean;
		__gaConsentDefaultsInit?: boolean;
	}
}

function ensureGtagStub() {
	if (typeof window === 'undefined') return;
	window.dataLayer = window.dataLayer || [];
	if (!window.gtag) {
		// Must push `arguments` (not a rest Array) — gtag.js expects that shape
		window.gtag = function gtag() {
			// eslint-disable-next-line prefer-rest-params
			window.dataLayer?.push(arguments);
		} as GtagFn;
	}
}

/** Consent Mode defaults (denied). Call once only, before any update. */
export function initConsentDefaults() {
	if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
	if (window.__gaConsentDefaultsInit) return;
	window.__gaConsentDefaultsInit = true;

	ensureGtagStub();
	window.gtag?.('consent', 'default', {
		analytics_storage: 'denied',
		ad_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied',
		wait_for_update: 500,
	});
}

export function isAnalyticsEnabled() {
	return (
		Boolean(GA_MEASUREMENT_ID) &&
		typeof window !== 'undefined' &&
		hasAnalyticsConsent() &&
		Boolean(window.gtag) &&
		Boolean(window.__gaLoaded)
	);
}

export function pageview(url: string) {
	if (!isAnalyticsEnabled()) return;
	window.gtag?.('config', GA_MEASUREMENT_ID, {
		page_path: url,
	});
}

type TrackEventParams = {
	action: string;
	category?: string;
	label?: string;
	params?: Record<string, string | number | boolean>;
};

export function trackEvent({action, category, label, params}: TrackEventParams) {
	if (!isAnalyticsEnabled()) return;
	window.gtag?.('event', action, {
		event_category: category,
		event_label: label,
		...params,
	});
}

function injectGaScript(): Promise<void> {
	return new Promise((resolve, reject) => {
		if (typeof document === 'undefined') {
			resolve();
			return;
		}
		const existing = document.querySelector<HTMLScriptElement>(
			`script[data-ga-src="${GA_MEASUREMENT_ID}"]`,
		);
		if (existing) {
			resolve();
			return;
		}
		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		script.dataset.gaSrc = GA_MEASUREMENT_ID;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error('Failed to load Google Analytics'));
		document.head.appendChild(script);
	});
}

/** Load GA only after the user accepted cookies */
export async function enableGoogleAnalytics() {
	if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
	if (!hasAnalyticsConsent()) return;

	initConsentDefaults();
	ensureGtagStub();
	window.gtag?.('consent', 'update', {
		analytics_storage: 'granted',
	});

	if (!window.__gaLoaded) {
		try {
			await injectGaScript();
		} catch (error) {
			console.warn('[analytics] No se pudo cargar gtag.js (¿bloqueador?)', error);
			return;
		}
		window.gtag?.('js', new Date());
		window.gtag?.('config', GA_MEASUREMENT_ID, {
			send_page_view: false,
			// DebugView en GA4 solo recibe hits con debug_mode
			...(process.env.NODE_ENV === 'development' ? {debug_mode: true} : {}),
		});
		window.__gaLoaded = true;
	}

	pageview(window.location.pathname + window.location.search);
}

export function disableGoogleAnalytics() {
	if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
	ensureGtagStub();
	window.gtag?.('consent', 'update', {
		analytics_storage: 'denied',
		ad_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied',
	});
}

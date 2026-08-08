export type CookieConsentValue = 'accepted' | 'rejected';

export const CONSENT_STORAGE_KEY = 'cookie_consent';
export const CONSENT_CHANGED_EVENT = 'cookie-consent-changed';

export function getConsent(): CookieConsentValue | null {
	if (typeof window === 'undefined') return null;
	const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
	if (value === 'accepted' || value === 'rejected') return value;
	return null;
}

export function hasAnalyticsConsent() {
	return getConsent() === 'accepted';
}

export function setConsent(value: CookieConsentValue) {
	if (typeof window === 'undefined') return;
	window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
	window.dispatchEvent(
		new CustomEvent(CONSENT_CHANGED_EVENT, {
			detail: {consent: value},
		}),
	);
}

/** Clears saved choice so the banner can be shown again */
export function openCookiePreferences() {
	if (typeof window === 'undefined') return;
	window.localStorage.removeItem(CONSENT_STORAGE_KEY);
	window.dispatchEvent(
		new CustomEvent(CONSENT_CHANGED_EVENT, {
			detail: {consent: null},
		}),
	);
}

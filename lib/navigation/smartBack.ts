import type {NextRouter} from 'next/router';

export const PREV_ROUTE_KEY = 'prevRoute';

type SmartBackOptions = {
	blogFallback?: string;
};

function getPrevRoute(): string | null {
	if (typeof window === 'undefined') return null;
	try {
		return sessionStorage.getItem(PREV_ROUTE_KEY);
	} catch {
		return null;
	}
}

function normalizePath(path: string): string {
	const withoutQuery = path.split('?')[0] ?? path;
	if (withoutQuery.length > 1 && withoutQuery.endsWith('/')) {
		return withoutQuery.slice(0, -1);
	}
	return withoutQuery;
}

export function navigateSmartBack(
	router: NextRouter,
	{blogFallback = '/blog'}: SmartBackOptions = {},
) {
	const prevRoute = getPrevRoute();
	const normalizedPrev = prevRoute ? normalizePath(prevRoute) : null;

	if (normalizedPrev === blogFallback) {
		void router.push(blogFallback);
		return;
	}

	if (typeof window !== 'undefined' && window.history.length > 1) {
		router.back();
		return;
	}

	void router.push(blogFallback);
}

import {useEffect, useState} from 'react';
import Lottie from 'lottie-react';

type LottieAnimationData = Record<string, unknown>;

interface LottieAnimationProps {
	/** Public path (e.g. `/lottie/404.json`) or inline animation JSON */
	src: string | LottieAnimationData;
	className?: string;
	loop?: boolean;
	ariaLabel?: string;
}

export default function LottieAnimation({
	src,
	className = '',
	loop = true,
	ariaLabel,
}: LottieAnimationProps) {
	const [animationData, setAnimationData] = useState<LottieAnimationData | null>(
		typeof src === 'string' ? null : src
	);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => setPrefersReducedMotion(media.matches);
		update();
		media.addEventListener('change', update);
		return () => media.removeEventListener('change', update);
	}, []);

	useEffect(() => {
		if (typeof src !== 'string') {
			setAnimationData(src);
			return;
		}

		const url = src;
		let cancelled = false;

		async function loadAnimation() {
			try {
				const response = await fetch(url);
				if (!response.ok) throw new Error(`Failed to load ${url}`);
				const data = (await response.json()) as LottieAnimationData;
				if (!cancelled) {
					setAnimationData(data);
					setFailed(false);
				}
			} catch {
				if (!cancelled) setFailed(true);
			}
		}

		void loadAnimation();
		return () => {
			cancelled = true;
		};
	}, [src]);

	if (prefersReducedMotion || failed || !animationData) {
		return (
			<div
				className={className}
				aria-hidden={ariaLabel ? undefined : true}
				aria-label={ariaLabel}
				role={ariaLabel ? 'img' : undefined}
			/>
		);
	}

	return (
		<div
			className={className}
			aria-hidden={ariaLabel ? undefined : true}
			aria-label={ariaLabel}
			role={ariaLabel ? 'img' : undefined}
		>
			<Lottie
				animationData={animationData}
				loop={loop}
				className='h-full w-full'
			/>
		</div>
	);
}

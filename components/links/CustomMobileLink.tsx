import {useRouter} from 'next/router';
import React from 'react';

interface CustomMobileLinkProps {
	href: string;
	title: string;
	className?: string;
	toggle: () => void;
}

export function CustomMobileLink({href, title, className = '', toggle}: CustomMobileLinkProps) {
	const router = useRouter();

	const handleClick = () => {
		toggle();
		router.push(href);
	};

	return (
		<button
			ref={href}
			className={`${className} relative group text-light dark:text-dark my-2`}
			onClick={handleClick}
		>
			{title}

			<span
				className={`
            h-[1px] inline-block  bg-light
            absolute left-0 -bottom-0.5
            group-hover:w-full transition-[width] ease duration-300
            ${router.asPath === href ? 'w-full' : 'w-0'}
            dark:bg-dark`}
			>
				&nbsp;
			</span>
		</button>
	);
}

import Link from 'next/link';
import {useRouter} from 'next/router';
import {homeSectionHref} from '@/lib/navigation';

interface CustomLinkProps {
	href: string;
	title: string;
	className?: string;
	onClick?: () => void;
}

export function CustomLink({href, title, className = '', onClick}: CustomLinkProps) {
	const router = useRouter();
	const resolvedHref = href.startsWith('#') ? homeSectionHref(href) : href;
	const isHashLink = resolvedHref.includes('#');
	const pathPart = resolvedHref.split('#')[0] || '/';
	const isActive = !isHashLink && router.pathname === pathPart;

	return (
		<Link
			href={resolvedHref}
			className={`${className} relative group text-primary dark:text-primaryDark`}
			scroll={isHashLink}
			onClick={onClick}
		>
			{title}

			<span
				className={` h-[1px] inline-block bg-primary absolute left-0 -bottom-0.5  group-hover:w-full transition-[width] ease duration-300 dark:bg-primaryDark ${
					isActive ? 'w-full' : 'w-0'
				}
			
			`}
			>
				&nbsp;
			</span>
		</Link>
	);
}

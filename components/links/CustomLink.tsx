import Link from 'next/link';
import {useRouter} from 'next/router';

interface CustomLinkProps {
	href: string;
	title: string;
	className?: string;
}

export function CustomLink({href, title, className = ''}: CustomLinkProps) {
	const router = useRouter();

	return (
		<Link
			href={href}
			className={`${className} relative group text-primary dark:text-primaryDark`}
			scroll={false}
		>
			{title}

			<span
				className={`
            h-[1px] inline-block bg-primary
            absolute left-0 -bottom-0.5
            group-hover:w-full transition-[width] ease duration-300
            ${router.asPath === href ? 'w-full' : 'w-0'}
            dark:bg-primaryDark `}
			>
				&nbsp;
			</span>
		</Link>
	);
}

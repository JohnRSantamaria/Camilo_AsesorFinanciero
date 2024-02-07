import Link from 'next/link';
import {useRouter} from 'next/router';

interface CustomLinkProps {
	href: string;
	title: string;
	className?: string;
}

export function CustomLink({href, title, className = ''}: CustomLinkProps) {
	const router = useRouter();
	const isActive = router.pathname === href.split('#')[0]; // Solo considera la parte de la URL antes del fragmento
	return (
		<Link
			href={href}
			className={`${className} relative group text-primary dark:text-primaryDark`}
			scroll={false}
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

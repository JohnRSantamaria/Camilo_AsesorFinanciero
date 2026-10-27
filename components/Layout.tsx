import React from 'react';

interface LayoutProps {
	children: React.ReactNode;
	className?: string;
}

export default function Layout({children, className}: LayoutProps) {
	return (
		<section
			className={`max-w-screen-2xl w-full min-h-screen text-foreground px-4 ${className}`}
		>
			{children}
		</section>
	);
}

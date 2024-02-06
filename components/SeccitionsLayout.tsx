import React from 'react';

interface SeccitionsLayoutProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
}

export default function SeccitionsLayout({children, className, id}: SeccitionsLayoutProps) {
	return (
		<section
			id={id}
			className={`flex flex-col min-h-[calc(100vh-50px)]  select-none ${className}`}
		>
			{children}
		</section>
	);
}

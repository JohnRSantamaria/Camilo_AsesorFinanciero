import React from 'react';

interface SectionsLayoutProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
}

export default function SectionsLayout({children, className, id}: SectionsLayoutProps) {
	return (
		<section
			id={id}
			className={`flex flex-col min-h-screen select-none ${className} px-4`}
		>
			{children}
		</section>
	);
}

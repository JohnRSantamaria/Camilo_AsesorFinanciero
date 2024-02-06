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
			className={`flex gap-4 h-[calc(100vh-56px)] select-none ${className}`}
		>
			{children}
		</section>
	);
}

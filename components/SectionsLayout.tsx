import React from 'react';

interface SectionsLayoutProps {
	children: React.ReactNode;
	className?: string;
	id?: string;
	viewport?: 'screen' | 'fill';
}

export default function SectionsLayout({
	children,
	className,
	id,
	viewport = 'screen',
}: SectionsLayoutProps) {
	const viewportClass = viewport === 'fill' ? 'min-h-0 flex-1' : 'min-h-screen';

	return (
		<section
			id={id}
			className={`flex flex-col ${viewportClass} select-none ${className ?? ''} px-4`}
		>
			{children}
		</section>
	);
}

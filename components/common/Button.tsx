import React from 'react';

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
}

export default function Button({children, className}: ButtonProps) {
	return (
		<button
			className={`px-2 py-1 rounded-lg  bg-primary text-white hover:shadow active:scale-95 transition-all duration-200 ${className}`}
		>
			{children}
		</button>
	);
}

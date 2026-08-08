import React from 'react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	variant?: 'default' | 'cta';
	type?: 'button' | 'submit' | 'reset';
}

export default function CommonButton({
	children,
	className,
	onClick,
	variant = 'default',
	type = 'button',
}: ButtonProps) {
	return (
		<Button
			type={type}
			variant={variant}
			onClick={onClick}
			className={cn(className)}
		>
			{children}
		</Button>
	);
}

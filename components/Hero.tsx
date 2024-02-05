import React from 'react';
import Button from './common/Button';
import Image from 'next/image';

import principalImage from '@/public/Image/MoneyBalance.webp';

function PrincipalImage() {
	return (
		<Image
			src={principalImage}
			alt='varios montones de monedas y una flecha que sube y baja'
			className='object-contain '
		/>
	);
}

export default function Hero() {
	return <section className='flex gap-4 h-[calc(100vh-6rem)] select-none'></section>;
}

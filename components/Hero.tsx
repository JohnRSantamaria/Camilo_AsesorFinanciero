import React from 'react';
import Image from 'next/image';

import principalImage from '@/public/Image/MoneyBalance.webp';
import SeccitionsLayout from './SeccitionsLayout';
import AnimatedText from './framerMotion/AnimatedText';

function PrincipalImage() {
	return (
		<Image
			src={principalImage}
			alt='varios montones de monedas y una flecha que sube y baja'
			className='object-contain px-16 md:px-0'
		/>
	);
}

export default function Hero() {
	return (
		<SeccitionsLayout
			id='/'
			className='grid  grid-cols-1 md:grid-cols-2 md:gap-4 '
		>
			<div className='flex flex-col items-center justify-evenly gap-4 px-4 md:order-1 '>
				<AnimatedText text='Educación y mentalidad financiera' />
				<PrincipalImage />
				<button className='px-4 py-2 rounded bg-gradient-to-t from-primary via-primaryLight to-primaryDark text-white uppercase active:scale-95 transition-transform duration-200 hover:shadow-md'>
					Agenda una cita
				</button>
				<p className='hidden md:block'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, aspernatur. Id est nam dicta
					dolorem obcaecati eum, ducimus illum natus tempore temporibus expedita placeat
					necessitatibus reiciendis optio a ipsum voluptate!
				</p>
			</div>
			<div className='md:flex items-center justify-center hidden  '>
				<PrincipalImage />
			</div>
		</SeccitionsLayout>
	);
}

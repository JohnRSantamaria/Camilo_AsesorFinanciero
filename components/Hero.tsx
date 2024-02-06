import React from 'react';
import Image from 'next/image';

import principalImage from '@/public/Image/MoneyBalance.webp';
import SeccitionsLayout from './SeccitionsLayout';
import AnimatedText from './framerMotion/AnimatedText';

function PrincipalImage({className}: {className?: string}) {
	return (
		<Image
			src={principalImage}
			alt='varios montones de monedas y una flecha que sube y baja'
			className={`${className} object-contain`}
		/>
	);
}

export default function Hero() {
	return (
		<SeccitionsLayout
			id='/'
			className='flex-col items-center justify-evenly pb-20 lg:pb-0 px-4'
		>
			<AnimatedText
				text='Educación y mentalidad financiera'
				className='!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl'
			/>

			<p className='text-xl text-center lg:text-4xl'>Construllamos tu futuro financiero juntos!</p>
			<button className='px-4 py-2 rounded bg-gradient-to-t from-primary via-primaryLight to-primaryDark text-white uppercase active:scale-95 transition-transform duration-200 hover:shadow-md'>
				Agenda una cita
			</button>

			<PrincipalImage className='sm:w-3/4 lg:h-60 xl:h-80 2xl:h-96 w-full' />
		</SeccitionsLayout>
	);
}

import React from 'react';
import Image from 'next/image';

import principalImage from '@/public/Image/MoneyBalance.webp';
import SectionsLayout from './SectionsLayout';
import AnimatedText from './framerMotion/AnimatedText';
import {useRouter} from 'next/router';

function PrincipalImage({className}: {className?: string}) {
	return (
		<Image
			src={principalImage}
			alt='varios montones de monedas y una flecha que sube y baja'
			className={`${className} w-96 h-96 object-contain`}
			priority={true}
		/>
	);
}

export default function Hero() {
	const router = useRouter();
	const handleClick = () => {
		// confirm-appointment/
		router.push('/confirm-appointment');
	};

	return (
		<SectionsLayout
			id='/'
			className='flex-col items-center justify-evenly sm:pb-20'
		>
			<AnimatedText
				text='Educación y mentalidad financiera'
				className='!text-3xl sm:!text-4xl md:!text-4xl lg:!text-6xl'
			/>

			<p className='text-lg sm:text-2xl text-center lg:text-4xl'>
				Construllamos tu futuro financiero juntos!
			</p>
			<button
				onClick={handleClick}
				className='px-4 py-2 rounded bg-gradient-to-t from-primary via-primaryLight to-primaryDark text-white uppercase active:scale-95 transition-transform duration-300 hover:shadow-md hover:scale-105 md:w-96 md:py-4 font-semibold tracking-widest '
			>
				Agenda una cita
			</button>

			<PrincipalImage className='sm:w-3/4 lg:h-60 xl:h-80 2xl:h-96 w-full' />
		</SectionsLayout>
	);
}

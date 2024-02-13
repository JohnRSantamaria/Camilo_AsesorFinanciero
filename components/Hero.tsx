import React from 'react';
import Image from 'next/image';
import heroImage from '../public/Image/hero_image.png';
import SectionsLayout from './SectionsLayout';
import AnimatedText from './framerMotion/AnimatedText';
import {useRouter} from 'next/router';

function PrincipalImage({className}: {className?: string}) {
	return (
		<Image
			src={heroImage}
			alt='varios montones de monedas y una flecha que sube y baja'
			className={`${className} w-auto h-full object-contain`}
			priority={true}
		/>
	);
}

export default function Hero() {
	const router = useRouter();
	const handleClick = () => {
		// confirm-appointment/
		router.push('https://calendly.com/camilomeza');
	};

	return (
		<section
			id='/'
			className='h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-8 justify-center items-center '
		>
			<div className='md:w-1/2 h-full w-full md:order-1 order-2 px-4'>
				<PrincipalImage />
			</div>
			<div className='flex flex-col gap-8 items-center justify-center w-full md:w-1/2 h-full order-1 md:order-2'>
				<AnimatedText
					text='Educación y mentalidad financiera'
					className='!text-3xl sm:!text-4xl md:!text-4xl lg:!text-6xl'
				/>

				<p className='text-lg sm:text-2xl text-center lg:text-4xl'>
					Tus finanzas personales lo agradecerán
				</p>
				<div className='px-4 w-full flex items-center justify-center '>
					<button
						onClick={handleClick}
						className='w-full px-4  py-2 rounded bg-gradient-to-t from-primary via-primaryLight to-primaryDark text-white uppercase active:scale-95 transition-transform duration-300 hover:shadow-md hover:scale-105 md:w-96 md:py-4 font-semibold tracking-widest max-w-xs '
					>
						Agenda una asesoría financiera
					</button>
				</div>
			</div>
		</section>
	);
}

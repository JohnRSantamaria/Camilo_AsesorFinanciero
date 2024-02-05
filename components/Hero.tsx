import React from 'react';
import Button from './common/Button';
import Image from 'next/image';

import principalImage from '@/public/Image/MoneyBalance.webp';

export default function Hero() {
	return (
		<section className='flex gap-4 h-[calc(100vh-6rem)] select-none'>
			<div className='xl:flex items-center justify-center lg:w-1/2 h-[50rem] hidden  '>
				<Image
					src={principalImage}
					alt='varios montones de monedas y una flecha que sube y baja'
					className='object-contain '
				/>
			</div>

			<div className='xl:w-1/2 flex flex-col justify-evenly items-start w-full h-[46rem] md:h-[50rem] '>
				<h1 className='text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r dark:bg-gradient-to-t from-primary via-primaryDark to-primaryLight text-center'>
					Educación y mentalidad financiera
				</h1>
				<div className='flex items-center justify-between gap-4 px-4'>
					<Image
						src={principalImage}
						alt='varios montones de monedas y una flecha que sube y baja'
						className='object-contain w-full h-full hidden xl:hidden sm:block lg:w-2/5 '
					/>
					<p className='text-center lg:w-3/5 xl:w-full w-full '>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quod, quos, voluptate,
						quae quia doloremque quibusdam quidem aspernatur pariatur quas doloribus.
					</p>
				</div>
				<div className='flex justify-center w-full '>
					<Button className='w-64 font-semibold py-2 text-2xl  hover:shadow-xl hover:bg-gradient-to-r from-primary to-primaryLight text-center'>
						Agendar ahora
					</Button>
				</div>
			</div>
		</section>
	);
}

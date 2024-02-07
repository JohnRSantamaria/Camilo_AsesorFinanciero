import React from 'react';
import AnimatedText from './framerMotion/AnimatedText';
import SeccitionsLayout from './SeccitionsLayout';

import financial_education from '@/public/Image/Investment_portfolio_1.webp';
import expense_control from '@/public/Image/expense_control.webp';
import budget from '@/public/Image/budget.webp';
import portfolio from '@/public/Image/portfolio.webp';
import Image, {StaticImageData} from 'next/image';
import Button from './common/Button';

interface CardServicesProps {
	title: string;
	image: StaticImageData;
}

function CardServices({title, image}: CardServicesProps) {
	return (
		<section className='flex flex-col gap-4 items-center bg-stone-200 dark:bg-zinc-800 rounded-md p-2 shadow-md overflow-hidden py-6 h-fit '>
			<h2 className='font-semibold text-center text-xl'>{title}</h2>
			<div className='flex flex-col gap-4 md:flex-row md:items-center md:gap-20 md:justify-evenly '>
				<Image
					src={image}
					alt='imagen de educación financiera'
					className='lg:w-52 '
				/>
				<div className='flex flex-col gap-4 lg:w-1/2'>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium ad aperiam quod
						recusandae dolor. Ex cum quas suscipit commodi libero quaerat consequatur tempore,
						corrupti incidunt quis explicabo laborum dolor laboriosam.
					</p>
					<Button className='w-full'>Conoce mas</Button>
				</div>
			</div>
		</section>
	);
}

export default function Services() {
	return (
		<SeccitionsLayout id='servicios'>
			<AnimatedText text='Servicios' />
			<div className='grid lg:grid-cols-2 gap-8 md:gap-4 w-full  h-full p-4 '>
				<CardServices
					title='Estructura de presupuesto'
					image={financial_education}
				/>
				<CardServices
					title='Control de gastos'
					image={expense_control}
				/>
				<CardServices
					title='Liquidación de deudas'
					image={budget}
				/>
				<CardServices
					title='Portafolio de inversión'
					image={portfolio}
				/>
			</div>
		</SeccitionsLayout>
	);
}

import React from 'react';
import AnimatedText from './framerMotion/AnimatedText';
import SectionsLayout from './SectionsLayout';

import financial_education from '@/public/Image/Investment_portfolio_1.webp';
import expense_control from '@/public/Image/expense_control.webp';
import budget from '@/public/Image/budget.webp';
import portfolio from '@/public/Image/portfolio.webp';

import Image, {StaticImageData} from 'next/image';

interface CardServicesProps {
	title: string;
	text: string;
	image: StaticImageData;
	className?: string;
}

function CardServices({title, text, image, className}: CardServicesProps) {
	return (
		<section
			className={`${className} flex flex-col gap-4 items-center bg-stone-200 dark:bg-zinc-800 rounded-md p-2 shadow-md overflow-hidden py-6 h-fit md:h-96 `}
		>
			<h2 className='font-semibold text-center text-xl sm:text-4xl md:text-3xl'>{title}</h2>
			<div className='flex flex-col gap-4  md:flex-row items-center justify-evenly '>
				<Image
					src={image}
					alt='imagen de educación financiera'
					className='w-auto h-40'
				/>
				<div className='flex flex-col gap-4 items-center xl:w-1/2'>
					<p className='text-justify max-w-96'>{text}</p>
				</div>
			</div>
		</section>
	);
}

export default function Services() {
	return (
		<SectionsLayout id='servicios'>
			<AnimatedText text='Servicios' />
			<div className='grid lg:grid-cols-2 grid-cols-1 justify-center gap-8 w-full  h-full '>
				<CardServices
					title='Estructura de presupuesto'
					text='Enfoco mis servicios en la Estructuración de Presupuesto, donde trabajamos juntos para establecer metas financieras alcanzables y crear un plan adaptado a tus necesidades. Mi objetivo es proporcionarte las herramientas necesarias para asignar recursos de manera eficiente y construir un plan financiero que te permita alcanzar tus objetivos a corto y largo plazo.
					'
					image={portfolio}
				/>
				<CardServices
					title='Control de gastos'
					text='Mi asesoría especializada en Control de Gastos te ofrece un enfoque personalizado para tomar el control de tus finanzas. Trabajaremos mano a mano para identificar áreas de gasto superfluo, establecer límites razonables y proporcionarte herramientas prácticas para gestionar y reducir tus gastos, optimizando así tus recursos económicos.
					'
					image={expense_control}
				/>
				<CardServices
					title='Liquidación de deudas'
					text='Acelero la Liquidación de Deudas, ofreciéndote estrategias efectivas para abordar este desafío. A través de un enfoque personalizado, te guiaré en la creación de planes de pago, negociación de tasas de interés y consolidación de deudas para liberarte del peso financiero y avanzar hacia la libertad económica.'
					image={budget}
				/>
				<CardServices
					title='Portafolio de inversión'
					text='Mi servicio de Portafolio de Inversión se centra en diseñar estrategias adaptadas a tus objetivos financieros. Ya sea que busques crecimiento a largo plazo, ingresos estables o una combinación, te proporcionaré asesoramiento en la selección de inversiones diversificadas y estrategias que maximicen el rendimiento de tu dinero.'
					image={financial_education}
				/>
			</div>
		</SectionsLayout>
	);
}

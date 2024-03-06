import React from 'react';
import AnimatedText from './framerMotion/AnimatedText';
import Image from 'next/image';
import me from '@/public/Image/financial_advisor.jpg';
import SectionsLayout from './SectionsLayout';
import Link from 'next/link';

export default function AboutMe() {
	return (
		<SectionsLayout id='aboutMe'>
			<AnimatedText text='Acerca de mi' />
			<div className='flex flex-col gap-4 md:flex-row text-primary dark:text-primaryDark '>
				<div className=' md:h-[calc(100vh-7rem)] md:w-1/2 flex items-center justify-center '>
					<Image
						src={me}
						alt='Un hombre con camiza y corbata sosteniendo un portafolio de inversiones'
						className='object-cover rounded-lg shadow-md w-96 h-96'
					/>
				</div>
				<div className='flex flex-col items-center gap-4 md:w-1/2 '>
					<section className='flex flex-col gap-2 text-lg font-light h-full items-center justify-center '>
						<h3 className='text-start w-full font-semibold'>Mis estudios </h3>
						<span>
							Soy profesional en economía con maestría en economía de las políticas públicas,
							estudios en derivados financieros, finanzas personales, creación de presupuesto,
							control de gastos y finca raíz. Enfoqué mis estudios independientes en educación y
							finanzas personales.
						</span>
						<h3 className='text-start w-full font-semibold'>Mi Experiencia</h3>
						<span>
							Tengo experiencia como analista de crédito empresarial en entidades del sector
							bancario, en análisis y procesamiento de datos en entidades del sector público y en
							asesoría financiera para personas, parejas y hogares.
						</span>
						<div className='flex flex-col gap-2 w-full '>
							<h3 className='text-start w-full font-semibold mt-8'>Descarga mi hoja de vida</h3>
							<Link
								href='/cv/HV_Camilo_Meza.pdf'
								target={'_blank'}
								className='w-full px-4 py-2 rounded bg-gradient-to-t from-primary via-primaryLight to-primaryDark text-white uppercase active:scale-95 transition-transform duration-300 hover:shadow-md hover:scale-105 md:w-96 md:py-4 font-semibold tracking-widest max-w-xs '
								download={true}
							>
								Click para descargar
							</Link>
						</div>
					</section>
				</div>
			</div>
		</SectionsLayout>
	);
}

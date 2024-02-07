import React from 'react';
import AnimatedText from './framerMotion/AnimatedText';
import Image from 'next/image';
import me from '@/public/Image/financial_advisor.jpg';
import SectionsLayout from './SectionsLayout';

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
							Soy un profesional en finanzas y relaciones internacionales con experiencia en el
							sector financiero y en la asesoría financiera personal y empresarial. Me encanta
							ayudar a las personas a tomar decisiones financieras inteligentes y a alcanzar sus
							objetivos financieros.
						</span>
						<h3 className='text-start w-full font-semibold'>Otra categoria </h3>
						<span>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed veniam accusamus porro
							repudiandae incidunt eligendi, qui soluta voluptas natus. Beatae provident quae vero
							accusamus impedit sint facere facilis dolorum sequi.
						</span>
						<h3 className='text-start w-full font-semibold'>Otra categoria </h3>
						<span>
							Deleniti necessitatibus consequuntur blanditiis vero consequatur itaque exercitationem
							fuga iste laboriosam quas, aut voluptas delectus optio reprehenderit laborum repellat
							fugit atque, repudiandae voluptate incidunt ipsam provident consectetur totam quasi!
							Veritatis.
						</span>
					</section>
				</div>
			</div>
		</SectionsLayout>
	);
}

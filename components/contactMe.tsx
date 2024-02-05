import React from 'react';
import AnimatedText from './framerMotion/AnimatedText';

export default function ContactMe() {
	return (
		<section
			className='flex gap-4 h-screen items-start '
			id='contacto'
		>
			<AnimatedText
				text='Contactame'
				className='mb-16 '
			/>
		</section>
	);
}

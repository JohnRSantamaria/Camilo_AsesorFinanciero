import React from 'react';
import AnimatedText from './framerMotion/AnimatedText';

export default function Services() {
	return (
		<section
			className='flex gap-4 h-screen items-start '
			id='servicios'
		>
			<AnimatedText
				text='Servicios'
				className='mb-16 '
			/>
		</section>
	);
}

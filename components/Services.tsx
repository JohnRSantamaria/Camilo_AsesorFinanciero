import React from 'react';
import AnimatedText from './framerMotion/AnimatedText';
import SeccitionsLayout from './SeccitionsLayout';

export default function Services() {
	return (
		<SeccitionsLayout
			className='flex gap-4 h-screen items-start '
			id='servicios'
		>
			<AnimatedText
				text='Servicios'
				className='mb-16 '
			/>
		</SeccitionsLayout>
	);
}

import React from 'react';
import AnimatedText from './framerMotion/AnimatedText';
import SectionsLayout from './SectionsLayout';

export default function ContactMe() {
	return (
		<SectionsLayout
			className='flex gap-4 h-screen items-start '
			id='contacto'
		>
			<AnimatedText text='Contactame' />
		</SectionsLayout>
	);
}

import React from 'react';
import AnimatedText from './framerMotion/AnimatedText';

export default function AboutMe() {
	return (
		<section
			className='flex gap-4 h-screen items-start '
			id='aboutMe'
		>
			<AnimatedText
				text='Acerca de mi'
				className='mb-16 '
			/>
		</section>
	);
}

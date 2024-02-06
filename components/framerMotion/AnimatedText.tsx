import React from 'react';
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';

interface AnimatedTextProps {
	text: string;
	className?: string;
}

export default function AnimatedText({
	text,
	className = '',
}: AnimatedTextProps): React.ReactElement {
	const {ref, inView} = useInView({
		threshold: 0.5,
		triggerOnce: false,
	});

	const quote = {
		initial: {
			opacity: 1,
		},
		animate: {
			opacity: 1,
			transition: {
				delay: 0.5,
				staggerChildren: 0.08,
			},
		},
	};

	const singelWord = {
		initial: {
			opacity: 0,
			y: 50,
		},
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
			},
		},
	};

	return (
		<div className='w-full mx-auto flex items-center justify-center text-center overflow-hidden'>
			<motion.h1
				ref={ref}
				className={`inline-block w-full text-primary font-bold capitalize text-4xl md:text-5xl lg:text-6xl py-4 ${className}`}
				variants={quote}
				initial='initial'
				animate={inView ? 'animate' : 'initial'}
			>
				{text.split(' ').map((word, index) => (
					<motion.span
						key={word + '-' + index}
						className='inline-block'
						variants={singelWord}
					>
						{word}&nbsp;
					</motion.span>
				))}
			</motion.h1>
		</div>
	);
}

import React from 'react';
import {MoonIcon} from './icons/moonIcon';
import {SunIcon} from './icons/sunIcon';
import {motion, AnimatePresence} from 'framer-motion';
import Link from 'next/link';
import useThemeSwitcher from '@/hooks/useThemeSwitcher';

export default function MenuMobile({isOpen, setIsOpen}: {isOpen: boolean; setIsOpen: Function}) {
	const [mode, setMode] = useThemeSwitcher();

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.section
					initial={{opacity: 0, y: 10}}
					animate={{opacity: 1, y: 0}}
					exit={{opacity: 0, y: 10}}
					transition={{duration: 0.2}}
					className='fixed top-12 bottom-0 left-0 right-0 z-40 bg-light dark:bg-dark '
				>
					<nav className='flex flex-col gap-16 px-4 py-4'>
						<ul className='flex flex-col gap-16 items-center justify-start h-fit text-2xl capitalize'>
							<li
								onClick={() => setIsOpen(!isOpen)}
								className='w-full text-center active:scale-95'
							>
								<Link href='/'>Inicio</Link>
							</li>
							<li
								onClick={() => setIsOpen(!isOpen)}
								className='w-full text-center active:scale-95'
							>
								<Link href='#servicios'>Servicios</Link>
							</li>
							<li
								onClick={() => setIsOpen(!isOpen)}
								className='w-full text-center active:scale-95'
							>
								<Link href='#aboutMe'>Acerca de mi</Link>
							</li>
							<li
								onClick={() => setIsOpen(!isOpen)}
								className='w-full text-center active:scale-95'
							>
								<Link href='#contacto'>Contacto</Link>
							</li>
							<li>
								<button
									onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
									className={`ml-3 flex items-center justify-center rounded-full p-1 
										${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
								>
									{mode === 'light' ? (
										// eslint-disable-next-line react/jsx-no-undef
										<SunIcon className={'fill-dark'} />
									) : (
										// eslint-disable-next-line react/jsx-no-undef
										<MoonIcon className={'fill-dark'} />
									)}
								</button>
							</li>
						</ul>
					</nav>
				</motion.section>
			)}
		</AnimatePresence>
	);
}

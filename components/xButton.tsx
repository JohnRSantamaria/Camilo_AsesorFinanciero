import Link from 'next/link';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import useThemeSwitcher from '@/hooks/useThemeSwitcher';
import {MoonIcon} from './icons/moonIcon';
import {SunIcon} from './icons/sunIcon';
import {FaTimes} from 'react-icons/fa';
import {GrMenu} from 'react-icons/gr';
export default function XButton() {
	const [isOpen, setIsOpen] = useState(false);
	const [mode, setMode] = useThemeSwitcher();

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button
				className='flex-col justify-center items-center flex'
				onClick={handleClick}
			>
				<GrMenu className='w-6 h-auto' />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.section
						initial={{opacity: 0, x: 20}}
						animate={{opacity: 1, x: 0}}
						exit={{opacity: 0, x: 20}}
						transition={{duration: 0.2}}
						className='fixed top-0 bottom-0 left-0 right-0 z-40 bg-light dark:bg-dark '
					>
						<nav className='flex flex-col gap-16 px-4 py-4'>
							<section className='flex items-center justify-between border-b-2 border-primary'>
								<h2 className='font-semibold text-2xl uppercase text-center'>Camilo Meza</h2>
								<FaTimes
									className='w-6 h-auto'
									onClick={() => setIsOpen(!isOpen)}
								/>
							</section>
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
		</>
	);
}

import useThemeSwitcher from '@/hooks/useThemeSwitcher';
import {CustomLink} from './links/CustomLink';
import {motion} from 'framer-motion';
import {SunIcon} from './icons/sunIcon';
import {MoonIcon} from './icons/moonIcon';
import {FaInstagram} from 'react-icons/fa';
import {HiOutlineMail} from 'react-icons/hi';
import {FaWhatsapp} from 'react-icons/fa';

export default function NavbarMenu() {
	const [mode, setMode] = useThemeSwitcher();

	return (
		<header className='hidden sm:flex  items-center justify-between w-full py-8 font-medium dark:text-primaryDark z-10 px-4 2xl:px-0'>
			<div className='w-full flex justify-between items-center '>
				<nav className='flex items-center justify-center'>
					<CustomLink
						href='/'
						title='Inicio'
						className='mr-4'
					/>
					<CustomLink
						href='#servicios'
						title='Servicios'
						className='mx-4'
					/>
					<CustomLink
						href='#aboutMe'
						title='Acerca de mí'
						className='mx-4'
					/>
					<CustomLink
						href='#contacto'
						title='Contacto'
						className='mx-4'
					/>
				</nav>

				<nav className='flex items-center justify-center flex-wrap '>
					<motion.a
						href='https://www.instagram.com/camilo_finanzas/'
						target={'_blank'}
						className='w-6 mx-3'
						whileHover={{y: -2}}
						whileTap={{scale: 0.9}}
					>
						<FaInstagram className='w-7 h-auto text-primary dark:text-primaryDark' />
					</motion.a>

					<motion.a
						href='https://wa.me/message/TVZTX5F2HKCMK1 '
						target={'_blank'}
						className='w-6 mx-3'
						whileHover={{y: -2}}
						whileTap={{scale: 0.9}}
					>
						<FaWhatsapp className='w-7 h-auto text-primary dark:text-primaryDark' />
					</motion.a>

					<motion.a
						href='mailto:asesorfinanciero@camilomeza.com'
						target={'_blank'}
						className='w-6 mx-3'
						whileHover={{y: -2}}
						whileTap={{scale: 0.9}}
					>
						<HiOutlineMail className='w-8 h-auto text-primary dark:text-primaryDark' />
					</motion.a>

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
				</nav>
			</div>
		</header>
	);
}

import {FaInstagram} from 'react-icons/fa';
import {HiOutlineMail} from 'react-icons/hi';
import {FaWhatsapp} from 'react-icons/fa';
import {useRouter} from 'next/router';
import {AiOutlinePhone} from 'react-icons/ai';
import Logo from '../public/Image/svg/logo2';
import Link from 'next/link';

interface CardContactProps {
	icon: React.ReactNode;
	title: string;
	url: string;
	target?: string;
}

function CardContact({icon, title, url, target = '_blank'}: CardContactProps) {
	return (
		<Link
			href={url}
			target={target}
			className='flex gap-2 items-center justify-start hover:opacity-60 cursor-pointer active:scale-95 transition-transform duration-300 capitalize'
		>
			{icon}
			{title}
		</Link>
	);
}

export default function Footer() {
	return (
		<footer className='h-fit w-full text-primary bg-stone-200 dark:bg-zinc-800 py-4 px-2 '>
			<section className='flex flex-col gap-2 sm:flex-row items-center justify-evenly max-w-screen-2xl ml-auto mr-auto '>
				<Logo className='w-auto h-20 sm:h-28 ' />
				<div className='flex flex-col  items-center justify-evenly  '>
					<h1 className='text-center text-nowrap font-bold text-2xl lg:text-4xl'>Camilo Meza</h1>
					<h2 className='text-center text-nowrap lg:text-2xl '>Asesor Financiero</h2>
				</div>
				<div className='flex items-center justify-evenly gap-8 '>
					<div className='flex flex-col gap-4'>
						<CardContact
							icon={<HiOutlineMail className='w-7 h-auto' />}
							title='Email'
							url='mailto:asesorfinanciero@camilomeza.com'
						/>
						<CardContact
							icon={<FaInstagram className='w-7 h-auto' />}
							title='Instragram'
							url='https://www.instagram.com/camilo_finanzas/'
						/>
					</div>
					<div className='flex flex-col gap-4'>
						<CardContact
							icon={<FaWhatsapp className='w-7 h-auto' />}
							title='Whatsapp'
							url='https://wa.me/message/TVZTX5F2HKCMK1 '
						/>
						<CardContact
							icon={<AiOutlinePhone className='w-7 h-auto' />}
							title='Contáctame'
							url='#contacto'
							target=''
						/>
					</div>
				</div>
			</section>
		</footer>
	);
}

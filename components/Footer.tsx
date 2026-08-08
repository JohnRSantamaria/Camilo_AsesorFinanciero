import {FaInstagram} from 'react-icons/fa';
import {HiOutlineMail} from 'react-icons/hi';
import {FaWhatsapp} from 'react-icons/fa';
import {AiOutlinePhone} from 'react-icons/ai';
import Logo from '../public/Image/svg/logo2';
import Link from 'next/link';
import {trackEvent} from '@/lib/analytics';
import {openCookiePreferences} from '@/lib/consent';

interface CardContactProps {
	icon: React.ReactNode;
	title: string;
	url: string;
	target?: string;
	onClick?: () => void;
}

function CardContact({icon, title, url, target = '_blank', onClick}: CardContactProps) {
	return (
		<Link
			href={url}
			target={target}
			onClick={onClick}
			className='flex gap-2 items-center justify-start hover:opacity-60 cursor-pointer active:scale-95 transition-transform duration-300 capitalize'
		>
			{icon}
			{title}
		</Link>
	);
}

export default function Footer() {
	return (
		<footer className='h-fit w-full text-primary bg-stone-200 dark:bg-zinc-800 p-2 '>
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
							onClick={() =>
								trackEvent({
									action: 'contact_email',
									category: 'contact',
									label: 'footer',
								})
							}
						/>
						<CardContact
							icon={<FaInstagram className='w-7 h-auto' />}
							title='Instagram'
							url='https://www.instagram.com/camilo_finanzas/'
							onClick={() =>
								trackEvent({
									action: 'contact_instagram',
									category: 'contact',
									label: 'footer',
								})
							}
						/>
					</div>
					<div className='flex flex-col gap-4'>
						<CardContact
							icon={<FaWhatsapp className='w-7 h-auto' />}
							title='WhatsApp'
							url='https://wa.me/message/TVZTX5F2HKCMK1 '
							onClick={() =>
								trackEvent({
									action: 'contact_whatsapp',
									category: 'contact',
									label: 'footer',
								})
							}
						/>
						<CardContact
							icon={<AiOutlinePhone className='w-7 h-auto' />}
							title='Contáctame'
							url='https://wa.me/message/TVZTX5F2HKCMK1'
							onClick={() =>
								trackEvent({
									action: 'contact_whatsapp',
									category: 'contact',
									label: 'footer_phone',
								})
							}
						/>
					</div>
				</div>
			</section>
			<div className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 lg:py-2 text-sm'>
				<div className='flex flex-wrap justify-center items-center gap-3'>
					<Link
						href='/privacidad'
						className='underline underline-offset-2 hover:opacity-80'
					>
						Privacidad y cookies
					</Link>
					<button
						type='button'
						className='underline underline-offset-2 hover:opacity-80'
						onClick={() => openCookiePreferences()}
					>
						Preferencias de cookies
					</button>
				</div>
				<span className='hidden sm:inline text-muted-foreground'>·</span>
				<div className='flex justify-center items-center'>
					Build With <span className='text-red-500 text-2xl px-1'>&#9825;</span>
					by&nbsp;
					<Link
						href='https://www.linkedin.com/in/john-santamaria-dev/'
						className='underline underline-offset-2'
					>
						JohnS
					</Link>
				</div>
			</div>
		</footer>
	);
}

import React from 'react';

import {FaInstagram} from 'react-icons/fa';
import {HiOutlineMail} from 'react-icons/hi';
import {FaWhatsapp} from 'react-icons/fa';
import {IoPhonePortraitOutline} from 'react-icons/io5';
import {useRouter} from 'next/router';

import Logo from '../public/Image/svg/logo';

interface CardContactProps {
	icon: React.ReactNode;
	title: string;
	handleClick?: () => void;
}

function CardContact({icon, title, handleClick}: CardContactProps) {
	return (
		<section
			onClick={handleClick}
			className='flex gap-2 items-center justify-start hover:opacity-60 cursor-pointer active:scale-95 transition-transform duration-300'
		>
			{icon}
			<span>{title}</span>
		</section>
	);
}

export default function Footer() {
	const router = useRouter();

	return (
		<footer className='h-fit w-full border'>
			<div className=''>
				<Logo className='w-full ' />
			</div>

			{/* <section className='flex justify-evenly items-center gap-2 w-5/6  '>
					<CardContact
						icon={<HiOutlineMail className='w-7 h-auto' />}
						title='Email'
					/>
					<CardContact
						icon={<FaInstagram className='w-7 h-auto' />}
						title='Instragram'
					/>
					<CardContact
						icon={<FaWhatsapp className='w-7 h-auto' />}
						title='Whatsapp'
					/>
					<CardContact
						icon={<IoPhonePortraitOutline className='w-7 h-auto' />}
						title='Contactame'
						handleClick={() => {
							router.push('#contacto');
						}}
					/>
				</section> */}
		</footer>
	);
}

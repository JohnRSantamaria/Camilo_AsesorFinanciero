import React from 'react';
import XButton from './xButton';
import Logo from '@/public/Image/svg/logo';

export default function MobileNabBarMenu() {
	return (
		<header className='sm:hidden items-center justify-between w-full py-2 px-4 font-medium dark:text-primaryDark z-10  '>
			<div className='w-full flex justify-between items-center '>
				<Logo className='w-10 h-auto' />
				<span className='text-lg'>Camilo Meza</span>
				<XButton />
			</div>
		</header>
	);
}

import React from 'react';
import XButton from './xButton';

export default function MobileNabBarMenu() {
	return (
		<header className='sm:hidden items-center justify-between w-full py-2 px-4 font-medium dark:text-primaryDark z-10  '>
			<div className='w-full flex justify-between items-center '>
				<section>
					<h2 className='font-semibold text-2xl uppercase '>Camilo Meza</h2>
				</section>

				<XButton />
			</div>
		</header>
	);
}

import Link from 'next/link';
import Head from 'next/head';
import {Raleway} from 'next/font/google';

import {IoArrowUpCircleOutline} from 'react-icons/io5';

import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import AboutMe from '@/components/AboutMe';
import Services from '@/components/Services';
import ContactMe from '@/components/contactMe';
import NavbarMenu from '@/components/NavbarMenu';
import MobileNabBarMenu from '@/components/MobileNabBarMenu';

const raleway = Raleway({subsets: ['latin']});

export default function Home() {
	return (
		<>
			<Head>
				<title>Camilo Meza Asesoria Financiera</title>
				<meta
					name='description'
					content='SPA de asesoria financiera personal y empresarial en la ciudad de Bogotá'
				/>
			</Head>
			<main
				id='home'
				className={`flex min-h-screen flex-col items-center justify-between bg-light dark:bg-dark ${raleway.className}  ml-auto mr-auto overflow-hidden`}
			>
				<Layout className='relative flex flex-col gap-2'>
					<NavbarMenu />
					<MobileNabBarMenu />
					<Hero />
					<Services />
					<AboutMe />
					<ContactMe />
					<div className='fixed bottom-8 right-4 cursor-pointer'>
						<Link
							rel='stylesheet'
							href='/'
							scroll={true}
						>
							<IoArrowUpCircleOutline className='text-dark dark:text-white w-10 h-full' />
						</Link>
					</div>
				</Layout>
				<Footer />
			</main>
		</>
	);
}

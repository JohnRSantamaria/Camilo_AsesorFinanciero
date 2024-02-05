import AboutMe from '@/components/AboutMe';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import MobileNabBarMenu from '@/components/MobileNabBarMenu';
import NavbarMenu from '@/components/NavbarMenu';
import Services from '@/components/Services';
import ContactMe from '@/components/contactMe';
import {Raleway} from 'next/font/google';
import Head from 'next/head';
import Link from 'next/link';

import {IoArrowUpCircleOutline} from 'react-icons/io5';

const raleway = Raleway({subsets: ['latin']});
export default function Home() {
	return (
		<>
			<Head>
				<title>My Portfolio Built with Nextjs</title>
				<meta
					name='description'
					content='Next.js developer portfolio Showcase your skills as a 
          full-stack developer and software engineer.'
				/>
			</Head>
			<main
				id='home'
				className={`flex min-h-screen flex-col items-center justify-between dark:bg-dark ${raleway.className}  ml-auto mr-auto overflow-hidden`}
			>
				<Layout className='flex flex-col gap-2'>
					<NavbarMenu />
					<MobileNabBarMenu />
					<Hero />
					<Services />
					<AboutMe />
					<ContactMe />
					<section>
						<div className='fixed bottom-10 right-10 cursor-pointer hover:text-yellow-200'>
							<Link
								rel='stylesheet'
								href='/'
								scroll={true}
							>
								<IoArrowUpCircleOutline className='text-primary dark:text-primaryDark w-10 h-full' />
							</Link>
						</div>
					</section>
				</Layout>
				<Footer />
			</main>
		</>
	);
}

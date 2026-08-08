import Link from "next/link";
import { Raleway } from "next/font/google";

import { IoArrowUpCircleOutline } from "react-icons/io5";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";
import NavbarMenu from "@/components/NavbarMenu";
import MobileNabBarMenu from "@/components/MobileNabBarMenu";
import SeoHead from "@/components/seo/SeoHead";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";

const raleway = Raleway({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <SeoHead
        title="Camilo Meza | Asesor Financiero en Bogotá"
        description={DEFAULT_DESCRIPTION}
        path="/"
      />
      <main
        id="home"
        className={`flex min-h-screen flex-col items-center justify-between bg-light dark:bg-dark ${raleway.className}  ml-auto mr-auto overflow-hidden`}
      >
        <Layout className="relative flex flex-col gap-2 pb-4">
          <div className="flex flex-col h-svh w-full shrink-0">
            <NavbarMenu />
            <MobileNabBarMenu />
            <Hero />
          </div>
          <Services />
          <AboutMe />
          <div className="fixed bottom-8 right-4 cursor-pointer">
            <Link rel="stylesheet" href="/" scroll={true}>
              <IoArrowUpCircleOutline className="text-dark dark:text-white w-10 h-full" />
            </Link>
          </div>
        </Layout>
        <Footer />
      </main>
    </>
  );
}
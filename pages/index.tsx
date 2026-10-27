import Link from "next/link";
import type { GetServerSideProps } from "next";
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
import { createPublicClient } from "@/lib/supabase/public";
import { DEFAULT_HERO_CTA_URL, HERO_CTA_SETTING_KEY } from "@/lib/settings/hero";

const raleway = Raleway({ subsets: ["latin"] });

type HomeProps = {
  heroCtaUrl: string;
};

export default function Home({ heroCtaUrl }: HomeProps) {
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
            <Hero ctaUrl={heroCtaUrl} />
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", HERO_CTA_SETTING_KEY)
      .maybeSingle();

    const value = data?.value;
    const heroCtaUrl =
      !error && typeof value === "string" && value.startsWith("https://")
        ? value
        : DEFAULT_HERO_CTA_URL;

    return { props: { heroCtaUrl } };
  } catch {
    return { props: { heroCtaUrl: DEFAULT_HERO_CTA_URL } };
  }
};
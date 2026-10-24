import Link from "next/link";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import NavbarMenu from "@/components/NavbarMenu";
import MobileNabBarMenu from "@/components/MobileNabBarMenu";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/framerMotion/AnimatedText";
import SeoHead from "@/components/seo/SeoHead";
import { createPublicClient } from "@/lib/supabase/public";
import type { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const raleway = Raleway({ subsets: ["latin"] });

type LibroIndexProps = {
  products: Product[];
};

export default function LibroIndexPage({ products }: LibroIndexProps) {
  return (
    <>
      <SeoHead
        title="Libro"
        description="Libro de Camilo Meza. Consulta la descripción y cómpralo con Mercado Pago."
        path="/libro"
      />
      <main
        className={`flex min-h-screen flex-col items-center justify-between bg-light dark:bg-dark ${raleway.className} ml-auto mr-auto overflow-hidden`}
      >
        <Layout className="relative flex flex-col gap-2">
          <NavbarMenu />
          <MobileNabBarMenu />
          <section className="mx-auto w-full px-4 pb-6">
            <AnimatedText text="Libro" />

            {products.length === 0 ? (
              <p className="mx-auto mt-6 max-w-xl text-center text-gray-600 dark:text-gray-300">
                Pronto estará disponible. Vuelve pronto.
              </p>
            ) : (
              <ul className="mx-auto mt-4 flex max-w-4xl flex-col gap-6">
                {products.map((product) => (
                  <li key={product.id}>
                    <Link href={`/libro/${product.slug}`}>
                      <Card
                        className={
                          product.cover_image
                            ? "flex h-72 w-full flex-row items-center justify-between gap-6"
                            : undefined
                        }
                      >
                        {product.cover_image ? (
                          <div className="relative h-full w-1/3">
                            <Image
                              src={product.cover_image}
                              alt={product.title}
                              fill
                              className="rounded-2xl object-cover shadow-lg"
                              sizes="(max-width: 768px) 40vw, 280px"
                            />
                          </div>
                        ) : null}
                        <div
                          className={`${product.cover_image ? "w-2/3" : "w-full"} flex h-full min-h-0 flex-col justify-between`}
                        >
                          <CardHeader>
                            <CardTitle className="text-xl text-primary">
                              {product.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 overflow-hidden">
                            <CardDescription className="line-clamp-4 whitespace-pre-line">
                              {product.description}
                            </CardDescription>
                          </CardContent>
                          <CardFooter>
                            <span className="text-sm font-medium text-primary">
                              Ver y comprar →
                            </span>
                          </CardFooter>
                        </div>
                      </Card>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </Layout>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<LibroIndexProps> = async () => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return { props: { products: [] } };
  }

  return {
    props: {
      products: (data ?? []) as Product[],
    },
  };
};

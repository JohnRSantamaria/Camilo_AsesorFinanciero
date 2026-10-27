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
import { isEmptyEditorHtml } from "@/lib/posts/editorHtml";
import PostContent from "@/components/blog/PostContent";
import type { Product } from "@/types/product";
import {
  Card,
  CardContent,
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
                            ? "flex w-full flex-row items-center gap-6"
                            : undefined
                        }
                      >
                        {product.cover_image ? (
                          <div className="relative aspect-[2/3] w-36 shrink-0 overflow-hidden rounded-2xl bg-stone-200 shadow-lg dark:bg-zinc-800 sm:w-40">
                            <Image
                              src={product.cover_image}
                              alt={product.title}
                              fill
                              className="object-contain"
                              sizes="160px"
                            />
                          </div>
                        ) : null}
                        <div
                          className={`${product.cover_image ? "min-w-0 flex-1" : "w-full"} flex flex-col justify-between`}
                        >
                          <CardHeader>
                            <CardTitle className="text-xl text-primary">
                              {product.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1 overflow-hidden">
                            <PostContent
                              content={
                                product.short_description &&
                                !isEmptyEditorHtml(product.short_description)
                                  ? product.short_description
                                  : product.description
                              }
                            />
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

import type { GetServerSideProps } from "next";
import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import NavbarMenu from "@/components/NavbarMenu";
import MobileNabBarMenu from "@/components/MobileNabBarMenu";
import Layout from "@/components/Layout";
import ProductDetail from "@/components/libro/ProductDetail";
import SeoHead from "@/components/seo/SeoHead";
import { createPublicClient } from "@/lib/supabase/public";
import { isEmptyEditorHtml, plainTextFromHtml } from "@/lib/posts/editorHtml";
import type { Product } from "@/types/product";

const raleway = Raleway({ subsets: ["latin"] });

type LibroProductPageProps = {
  product: Product;
};

export default function LibroProductPage({ product }: LibroProductPageProps) {
  const previewSource =
    product.short_description && !isEmptyEditorHtml(product.short_description)
      ? product.short_description
      : product.description;
  const description = plainTextFromHtml(previewSource).slice(0, 160);

  return (
    <>
      <SeoHead
        title={product.title}
        description={description || product.title}
        path={`/libro/${product.slug}`}
        image={product.cover_image}
      />
      <main
        className={`flex min-h-screen flex-col items-center justify-between bg-light dark:bg-dark ${raleway.className} ml-auto mr-auto overflow-hidden`}
      >
        <Layout className="relative flex flex-col gap-2">
          <NavbarMenu />
          <MobileNabBarMenu />
          <section className="mx-auto w-full px-4 pb-6">
            <ProductDetail product={product} />
          </section>
        </Layout>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<LibroProductPageProps> = async (
  context
) => {
  const slug = context.params?.slug;
  if (typeof slug !== "string") {
    return { notFound: true };
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data) {
    return { notFound: true };
  }

  return {
    props: {
      product: data as Product,
    },
  };
};

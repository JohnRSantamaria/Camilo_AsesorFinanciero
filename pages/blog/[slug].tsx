import { useEffect } from "react";
import type { GetServerSideProps } from "next";
import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import NavbarMenu from "@/components/NavbarMenu";
import MobileNabBarMenu from "@/components/MobileNabBarMenu";
import Layout from "@/components/Layout";
import PostArticle from "@/components/blog/PostArticle";
import SeoHead from "@/components/seo/SeoHead";
import { createPublicClient } from "@/lib/supabase/public";
import { trackEvent } from "@/lib/analytics";
import { isPostLive } from "@/lib/posts/visibility";
import type { Post } from "@/types/post";

const raleway = Raleway({ subsets: ["latin"] });

type BlogPostPageProps = {
  post: Post;
};

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const pageTitle = post.meta_title?.trim() || post.title;
  const pageDescription =
    post.meta_description?.trim() || post.excerpt?.trim() || post.title;
  const ogImage = post.cover_image || undefined;
  const publishedTime = post.published_at || post.created_at;

  useEffect(() => {
    trackEvent({
      action: "blog_post_view",
      category: "blog",
      label: post.slug,
      params: {
        slug: post.slug,
        title: post.title,
      },
    });
  }, [post.slug, post.title]);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        path={`/blog/${post.slug}`}
        image={ogImage}
        type="article"
        publishedTime={publishedTime}
      />
      <main
        className={`flex min-h-screen flex-col items-center justify-between bg-light dark:bg-dark ${raleway.className}  ml-auto mr-auto overflow-hidden`}
      >
        <Layout className="relative flex flex-col gap-2">
          <NavbarMenu />
          <MobileNabBarMenu />
          {/* content section */}
          <section className="px-4 mx-auto w-full pb-6">
            <PostArticle post={post} />
          </section>
        </Layout>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async (
  context
) => {
  const slug = context.params?.slug;
  if (typeof slug !== "string") {
    return { notFound: true };
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error || !data || !isPostLive(data as Post)) {
    return { notFound: true };
  }

  return {
    props: {
      post: data as Post,
    },
  };
};

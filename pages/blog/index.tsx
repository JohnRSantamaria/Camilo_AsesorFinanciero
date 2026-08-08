import Link from "next/link";
import Image from "next/image";
import type { GetServerSideProps } from "next";
import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import NavbarMenu from "@/components/NavbarMenu";
import MobileNabBarMenu from "@/components/MobileNabBarMenu";
import Layout from "@/components/Layout";
import { createPublicClient } from "@/lib/supabase/public";
import { isPostLive } from "@/lib/posts/visibility";
import type { Post } from "@/types/post";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedText from "@/components/framerMotion/AnimatedText";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import SeoHead from "@/components/seo/SeoHead";

const raleway = Raleway({ subsets: ["latin"] });

type BlogIndexProps = {
  posts: Post[];
};

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage({ posts }: BlogIndexProps) {
  return (
    <>
      <SeoHead
        title="Blog"
        description="Artículos de educación y mentalidad financiera para personas, parejas y hogares."
        path="/blog"
      />
      <main
        className={`flex min-h-screen flex-col items-center justify-between bg-light dark:bg-dark ${raleway.className}  ml-auto mr-auto overflow-hidden`}
      >
        <Layout className="relative flex flex-col gap-2">
          <NavbarMenu />
          <MobileNabBarMenu />
          <section className="px-4 mx-auto w-full pb-6">
            <AnimatedText text="Educación y mentalidad financiera" />

            {posts.length === 0 ? (
              <BlogEmptyState />
            ) : (
              <ul className="flex flex-col gap-4 mt-4 gap-y-6 max-w-4xl mx-auto">
                {posts.map((post) => (
                  <li key={post.id}>
                    <Link href={`/blog/${post.slug}`}>
                      <Card
                        className={`${post.cover_image && "flex flex-row gap-6 items-center justify-between h-72 w-full"}`}
                      >
                        {post.cover_image ? (
                          <div className="relative w-1/2 md:w-1/3 h-full">
                            <Image
                              src={post.cover_image}
                              alt={post.title}
                              fill
                              className="object-cover rounded-2xl shadow-lg"
                              sizes="(max-width: 768px) 100vw, 896px"
                            />
                          </div>
                        ) : null}
                        <div
                          className={`${post.cover_image ? "w-1/2 md:w-2/3" : "w-full"} flex flex-col justify-between h-full min-h-0`}
                        >
                          <CardHeader className="flex flex-col w-full shrink-0">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <CardTitle className="text-xl text-primary">
                                  {post.title}
                                </CardTitle>
                                {post.video_url ? (
                                  <Badge variant="secondary">Video</Badge>
                                ) : null}
                              </div>
                              {post.published_at ? (
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(post.published_at)}
                                </span>
                              ) : null}
                            </div>
                          </CardHeader>
                          <CardContent className="flex flex-col flex-1 min-h-0 overflow-hidden">
                            {post.excerpt ? (
                              <CardDescription className="line-clamp-none whitespace-pre-line">
                                {post.excerpt}
                              </CardDescription>
                            ) : null}
                          </CardContent>
                          <CardFooter className="shrink-0 w-full">
                            <span className="text-sm font-medium text-primary">
                              Leer más →
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

export const getServerSideProps: GetServerSideProps<
  BlogIndexProps
> = async () => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (error) {
    return { props: { posts: [] } };
  }

  const posts = ((data ?? []) as Post[]).filter((post) => isPostLive(post));

  return {
    props: {
      posts,
    },
  };
};

import Image from "next/image";
import YouTubeEmbed from "@/components/blog/YouTubeEmbed";
import PostContent from "@/components/blog/PostContent";
import BlogBackLink from "@/components/blog/BlogBackLink";
import type { Post } from "@/types/post";
import AnimatedText from "../framerMotion/AnimatedText";

type PostArticleProps = {
  post: Pick<
    Post,
    | "title"
    | "excerpt"
    | "content"
    | "cover_image"
    | "video_url"
    | "published_at"
  >;
};

function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostArticle({ post }: PostArticleProps) {
  return (
    <article className="mx-auto flex flex-col gap-4">
      <header className="flex flex-row items-start justify-between gap-4">
        <div className="min-w-0 flex-1 flex flex-wrap items-center justify-between gap-2">
          <AnimatedText text={post.title} />
          {post.published_at ? (
            <>
              <p className="text-sm text-muted-foreground">
                {formatDate(post.published_at)}
              </p>
              <BlogBackLink />
            </>
          ) : null}
        </div>
      </header>

      {/* hero image */}

      {post.video_url ? (
        <YouTubeEmbed url={post.video_url} title={post.title} />
      ) : null}

      <div>
        {post.excerpt ? (
          <p className="text-lg text-gray-400 dark:text-gray-300 whitespace-pre-line">
            {post.excerpt}
          </p>
        ) : null}
      </div>

      {/* content */}
      <PostContent content={post.content} />
    </article>
  );
}

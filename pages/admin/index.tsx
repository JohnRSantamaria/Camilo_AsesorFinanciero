import type { GetServerSideProps } from "next";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { isPostScheduled } from "@/lib/posts/visibility";
import type { Post } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RecentPost = Pick<
  Post,
  "id" | "title" | "published" | "published_at" | "updated_at"
>;

type DashboardProps = {
  email: string;
  postsCount: number;
  publishedCount: number;
  draftCount: number;
  scheduledCount: number;
  recentPosts: RecentPost[];
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function statusBadge(post: RecentPost) {
  if (isPostScheduled(post)) {
    return <Badge variant="secondary">Programado</Badge>;
  }
  if (post.published) {
    return <Badge variant="success">Publicado</Badge>;
  }
  return <Badge variant="muted">Borrador</Badge>;
}

export default function AdminDashboardPage({
  email,
  postsCount,
  publishedCount,
  draftCount,
  scheduledCount,
  recentPosts,
}: DashboardProps) {
  return (
    <AdminLayout title="Admin — Panel" email={email}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Gestiona el contenido del sitio
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="font-semibold">
              <Link href="/admin/posts/new">Nuevo post</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/posts">Administrar posts</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir Google Analytics
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Total</CardDescription>
              <CardTitle className="text-3xl">{postsCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Publicados</CardDescription>
              <CardTitle className="text-3xl">{publishedCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Borradores</CardDescription>
              <CardTitle className="text-3xl">{draftCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Programados</CardDescription>
              <CardTitle className="text-3xl">{scheduledCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="bg-stone-200 dark:bg-zinc-800 border-0 ring-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Últimos posts</CardTitle>
            <CardDescription>
              Los 5 más recientes por actualización
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aún no hay posts.{" "}
                <Link
                  href="/admin/posts/new"
                  className="text-primary underline"
                >
                  Crea el primero
                </Link>
                .
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {recentPosts.map((post) => (
                  <li
                    key={post.id}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{post.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Actualizado {formatDate(post.updated_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {statusBadge(post)}
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/posts/${post.id}`}>Editar</Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  context
) => {
  const result = await requireAdmin(context);
  if (!result.ok) return result.redirect;

  const supabase = createClient(context);
  const { data: allPosts } = await supabase
    .from("posts")
    .select("id, title, published, published_at, updated_at")
    .order("updated_at", { ascending: false });

  const posts = (allPosts ?? []) as RecentPost[];
  const now = new Date();
  const scheduled = posts.filter((post) => isPostScheduled(post, now));
  const drafts = posts.filter((post) => !post.published);
  const livePublished = posts.filter(
    (post) => post.published && !isPostScheduled(post, now)
  );  
  return {
    props: {
      email: result.session.email,
      postsCount: posts.length,
      publishedCount: livePublished.length,
      draftCount: drafts.length,
      scheduledCount: scheduled.length,
      recentPosts: posts.slice(0, 5),
    },
  };
};

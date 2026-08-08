import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Raleway } from "next/font/google";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const raleway = Raleway({ subsets: ["latin"] });

type AdminLayoutProps = {
  title: string;
  email: string;
  children: React.ReactNode;
};

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
];

export default function AdminLayout({
  title,
  email,
  children,
}: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    await router.push("/admin/login");
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        className={`${raleway.className} min-h-screen bg-light dark:bg-dark`}
      >
        <header className="border-b border-border bg-stone-200 dark:bg-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                Admin
              </p>
              <h1 className="text-xl font-bold text-primary">Camilo Meza</h1>
            </div>
            <nav className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => {
                const active =
                  item.href === "/admin"
                    ? router.pathname === "/admin"
                    : router.pathname.startsWith(item.href);
                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={active ? "default" : "outline"}
                    size="sm"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                );
              })}
              <span className="text-xs text-muted-foreground hidden sm:inline ml-2">
                {email}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button>
            </nav>
          </div>
        </header>
        <main className={cn("max-w-6xl mx-auto px-4 py-8")}>{children}</main>
      </div>
    </>
  );
}

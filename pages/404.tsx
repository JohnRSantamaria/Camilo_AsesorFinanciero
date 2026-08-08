import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

export default function Custom404() {
  const router = useRouter();

  const goBack = () => {
    router.push("/");
  };

  return (
    <main className="flex h-svh w-full flex-col items-center justify-between gap-4 bg-light p-4 text-primary dark:bg-dark ">
      <h1 className="text-4xl font-bold">Página no encontrada</h1>
      <LottieAnimation src="/lottie/404.json" className="" />
      <Button
        variant="link"
        onClick={goBack}
        className="h-auto max-w-xs px-6 py-3"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <p className="text-lg font-medium">Volver a la página principal</p>
      </Button>
    </main>
  );
}

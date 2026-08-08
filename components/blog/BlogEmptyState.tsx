import dynamic from "next/dynamic";
import { getBlogEmptyLottieSrc } from "@/lib/lottie/blog-empty";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

export default function BlogEmptyState() {
  return (
    <div className="mx-auto flex flex-col items-center gap-4 text-center">
      <LottieAnimation
        src={getBlogEmptyLottieSrc()}
        className="aspect-square w-full max-w-2xl"
      />
      <p className="text-gray-600 dark:text-gray-300">
        Pronto publicaremos artículos. Vuelve pronto.
      </p>
    </div>
  );
}

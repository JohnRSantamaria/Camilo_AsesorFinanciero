import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { Product } from "@/types/product";
import AnimatedText from "@/components/framerMotion/AnimatedText";

type ProductDetailProps = {
  product: Pick<
    Product,
    "title" | "slug" | "description" | "cover_image" | "payment_url" | "payment_label"
  >;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const paymentLabel = product.payment_label?.trim() || "Comprar ahora";

  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/libro"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary dark:text-primaryDark"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Volver
        </Link>
      </div>

      <AnimatedText text={product.title} />

      {product.cover_image ? (
        <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl bg-stone-200 shadow-lg dark:bg-zinc-800">
          <Image
            src={product.cover_image}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 320px"
          />
        </div>
      ) : null}

      <p className="whitespace-pre-line text-lg text-gray-600 dark:text-gray-300">
        {product.description}
      </p>

      <div className="flex flex-col gap-3 rounded-lg border border-border bg-stone-200/70 p-4 dark:bg-zinc-800/70 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground">Pago seguro en Mercado Pago.</p>
        <Button variant="cta" size="cta" asChild>
          <a
            href={product.payment_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent({
                action: "libro_payment_click",
                category: "libro",
                label: product.slug,
                params: {
                  slug: product.slug,
                  title: product.title,
                },
              })
            }
          >
            {paymentLabel}
          </a>
        </Button>
      </div>
    </article>
  );
}

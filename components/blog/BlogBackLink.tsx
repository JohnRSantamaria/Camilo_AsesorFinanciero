import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { trackEvent } from "@/lib/analytics";
import { navigateSmartBack } from "@/lib/navigation/smartBack";
import { cn } from "@/lib/utils";

type BlogBackLinkProps = {
  className?: string;
};

const buttonVariants = {
  hidden: { opacity: 0, x: 8 },
  rest: { opacity: 1, x: 0 },
  hover: { opacity: 1, x: 0 },
  tap: { opacity: 1, x: 0, scale: 0.95 },
};

const iconVariants = {
  hidden: { x: 0 },
  rest: { x: 0 },
  hover: { x: -3 },
  tap: { x: -3 },
};

export default function BlogBackLink({ className }: BlogBackLinkProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    trackEvent({
      action: "blog_back_click",
      category: "blog",
      label: router.asPath,
    });
    navigateSmartBack(router);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label="Volver al blog"
      initial={prefersReducedMotion ? false : "hidden"}
      animate="rest"
      variants={prefersReducedMotion ? undefined : buttonVariants}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      whileTap={prefersReducedMotion ? undefined : "tap"}
      transition={{ duration: 0.25 }}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium",
        "text-primary dark:text-primaryDark",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm",
        className
      )}
    >
      <motion.span
        className="inline-flex shrink-0"
        aria-hidden
        variants={prefersReducedMotion ? undefined : iconVariants}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <ArrowLeft className="h-5 w-5" />
      </motion.span>
      <span className="relative inline">
        Volver al blog
        <span
          className="absolute left-0 -bottom-0.5 h-px w-0 bg-primary transition-[width] duration-300 ease-out group-hover:w-full dark:bg-primaryDark"
          aria-hidden
        />
      </span>
    </motion.button>
  );
}

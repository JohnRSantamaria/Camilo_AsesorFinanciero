import dynamic from "next/dynamic";
import Link from "next/link";
import { Raleway } from "next/font/google";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import AnimatedText from "@/components/framerMotion/AnimatedText";

const raleway = Raleway({ subsets: ["latin"] });

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

const LINK_TEXT = "Volver a la página principal";

const REST_SHADOW = "0 1px 2px rgba(0,0,0,0.2)";
const WAVE_SHADOWS = [
  "0 1px 2px rgba(0,0,0,0.2)",
  "0 10px 18px rgba(0,0,0,0.55)",
  "0 1px 2px rgba(0,0,0,0.2)",
];

export default function Custom404() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const letters = LINK_TEXT.split("");

  // Force light mode for this page only; restore previous dark preference on leave.
  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    root.classList.remove("dark");
    return () => {
      if (wasDark) root.classList.add("dark");
    };
  }, []);

  return (
    <main
      className={`${raleway.className} flex h-svh w-full flex-col items-center overflow-hidden bg-light px-4 pb-4 pt-6 text-dark`}
    >
      <div className="flex min-h-0 w-full flex-1 items-center justify-center py-2">
        <LottieAnimation
          src="/lottie/404.json"
          className="h-full w-full"
          ariaLabel="Ilustración de página no encontrada"
        />
      </div>

      <Link
        href="/"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`mb-2 inline-flex shrink-0 items-center gap-2 text-base font-semibold tracking-wide
           text-dark no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
            focus-visible:ring-offset-2 sm:mb-4 sm:text-lg`}
      >
        <ArrowLeftIcon className="size-5 shrink-0" aria-hidden />
        <span className="inline-flex items-center" aria-label={LINK_TEXT}>
          {letters.map((letter, index) =>
            shouldReduceMotion ? (
              <span
                key={`letter-${index}`}
                className="[text-shadow:0_2px_4px_rgba(0,0,0,0.35)]"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ) : (
              <motion.span
                key={`letter-${index}`}
                className="inline-block"
                animate={
                  isHovered
                    ? { y: 0, textShadow: REST_SHADOW }
                    : {
                        y: [0, -6, 0],
                        textShadow: WAVE_SHADOWS,
                      }
                }
                transition={
                  isHovered
                    ? {
                        duration: 0.5,
                        ease: "easeOut",
                        delay: index * 0.02,
                      }
                    : {
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.045,
                      }
                }
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            )
          )}
        </span>
      </Link>
    </main>
  );
}

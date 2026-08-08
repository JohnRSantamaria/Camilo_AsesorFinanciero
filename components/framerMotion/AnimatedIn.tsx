import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedIn({
  children,
  className = "",
  delay = 0,
}: AnimatedInProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={
        shouldReduceMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

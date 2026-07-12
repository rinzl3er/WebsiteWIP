import type { Variants, MotionProps } from "framer-motion";

export const revealProps: MotionProps = {
  initial: {
    opacity: 0,
    y: 30,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.2,
  },
  transition: {
    duration: 0.7,
    ease: "easeOut",
  },
};

export const staggerContainer: MotionProps = {
  initial: "hidden",
  whileInView: "show",
  viewport: {
    once: true,
    amount: 0.2,
  },
  variants: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  },
};

export const staggerItem = {
  variants: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },
} satisfies {
  variants: Variants;
};
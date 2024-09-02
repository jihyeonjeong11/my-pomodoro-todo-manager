import { type MotionProps } from "framer-motion";
import { useEffect, useState } from "react";

const useTaskButtonTransition = (showAddProps: boolean): MotionProps => {
  const [isInitiated, setIsInitiated] = useState(false);

  useEffect(() => {
    if (showAddProps && !isInitiated) {
      setIsInitiated(true);
    }
  }, [showAddProps, isInitiated]);

  const variants = {
    initial: {
      height: "2rem",
    },
    shrink: {
      height: "2rem",
    },
    enlarge: {
      height: "5rem",
    },

    hide: {
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.5,
      },
    },
  };

  return {
    initial: "shrink",
    animate: isInitiated
      ? // eslint-disable-next-line unicorn/no-nested-ternary
        showAddProps
        ? ["enlarge", "hide", "show"]
        : ["shrink"]
      : [],
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
    variants,
  };
};

export default useTaskButtonTransition;

import { type MotionProps } from "framer-motion";

const useTaskItemTransition = (): MotionProps => {
  const variants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };
  return variants;
};

export default useTaskItemTransition;

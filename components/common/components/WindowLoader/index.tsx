import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { AnimatePresence } from "framer-motion";
import MainWindow from "@/components/common/components/Window/MainWindow";

const WindowLoader = () => {
  const {
    taskWindows: { get: getTaskWindows = {} },
  } = useTaskWindows(["taskWindows"]);
  console.log(getTaskWindows);
  return (
    <AnimatePresence initial={false} presenceAffectsLayout={false}>
      {Object.entries(getTaskWindows).map(([id]) => (
        <MainWindow key={id} />
      ))}
    </AnimatePresence>
  );
};

export default WindowLoader;

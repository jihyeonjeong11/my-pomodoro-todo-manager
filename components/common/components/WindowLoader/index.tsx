import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { AnimatePresence } from "framer-motion";
import MainWindow from "@/components/common/components/Window/MainWindow";
import LoaderWindow from "../Window/LoaderWindow";

const WindowLoader = () => {
  const {
    taskWindows: { get: getTaskWindows = {} },
  } = useTaskWindows(["taskWindows"]);

  return (
    <AnimatePresence initial={false} presenceAffectsLayout={false}>
      {Object.entries(getTaskWindows).map(([id, props]) => {
        switch (id) {
          case "loader": {
            // Handle the case when id is 'loader'
            return <LoaderWindow key={id} {...props} />;
          }

          default: {
            // For other ids, use the MainWindow component
            return <MainWindow key={id} {...props} />;
          }
        }
      })}
    </AnimatePresence>
  );
};

export default WindowLoader;

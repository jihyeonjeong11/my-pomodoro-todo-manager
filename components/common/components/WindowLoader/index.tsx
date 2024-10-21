import { useTaskWindows } from "@/components/contexts/TaskwindowContext";
import { AnimatePresence } from "framer-motion";
import LoaderWindow from "@/components/common/components/Window/LoaderWindow";

const WindowLoader = () => {
  const {
    taskWindows: { get: getTaskWindows = {} },
  } = useTaskWindows(["taskWindows"]);

  return (
    <AnimatePresence initial={false} presenceAffectsLayout={false}>
      {Object.entries(getTaskWindows).map(([id, props]) => {
        switch (id) {
          case "loader": {
            return <LoaderWindow key={id} {...props} />;
          }

          default: {
            return null;
          }
        }
      })}
    </AnimatePresence>
  );
};

export default WindowLoader;

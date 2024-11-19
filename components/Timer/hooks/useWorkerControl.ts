import { type MutableRefObject, useEffect } from "react";

const useWorkerControl = (
  worker: MutableRefObject<Worker | undefined>,
  isStarted: "started" | "stopped"
) => {
  useEffect(() => {
    if (worker.current && isStarted === "started") {
      worker.current?.postMessage("started");
    }

    if (worker.current && isStarted === "stopped") {
      worker.current?.postMessage("stopped");
    }
  }, [worker, isStarted]);
};

export default useWorkerControl;

import { useEffect, useRef } from "react";

const useWorker = <T>(
  workerInit?: (info?: string) => Worker,
  onMessage?: (message: MessageEvent<T>) => void,
  workerInfo?: string
): React.MutableRefObject<Worker | undefined> => {
  const worker = useRef<Worker>();

  useEffect(() => {
    console.log(worker, "why init called twice");
    if (workerInit && !worker.current) {
      console.log("on startup");
      worker.current = workerInit(workerInfo);

      if (onMessage) {
        worker.current.addEventListener("message", onMessage, {
          passive: true,
        });
      }

      worker.current.postMessage("init");
    }

    return () => {
      console.log("???");
      worker.current?.terminate();
      worker.current = undefined;
    };
  }, [onMessage, workerInfo, workerInit]);

  return worker;
};

export default useWorker;

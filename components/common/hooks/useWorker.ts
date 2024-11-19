import { useCallback, useEffect, useRef } from "react";

const useWorker = <T>(
  workerInit?: (info?: string) => Worker,
  onMessage?: (message: MessageEvent<T>) => void,
  workerInfo?: string
): React.MutableRefObject<Worker | undefined> => {
  const worker = useRef<Worker>();

  const memoizedWorkerInit = useCallback(workerInit, []);
  const memoizedOnMessage = useCallback(onMessage, []);

  useEffect(() => {
    if (memoizedWorkerInit && !worker.current) {
      worker.current = memoizedWorkerInit(workerInfo);

      if (memoizedOnMessage) {
        worker.current.addEventListener("message", memoizedOnMessage, {
          passive: true,
        });
      }

      worker.current.postMessage("init");
    }

    return () => {
      worker.current?.terminate();
      worker.current = undefined;
    };
  }, [memoizedWorkerInit, memoizedOnMessage, workerInfo]);

  return worker;
};

export default useWorker;

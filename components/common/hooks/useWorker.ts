import { useCallback, useEffect, useRef } from "react";

const useWorker = <T>(
  workerInit: (info?: string) => Worker,
  onMessage: (message: MessageEvent<T>) => void,
  workerInfo?: string // remove later
): React.MutableRefObject<Worker | undefined> => {
  const worker = useRef<Worker>();

  // worker Instance and onMessage will not change! No need to be exhaustive-deps rule.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedWorkerInit = useCallback(workerInit, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

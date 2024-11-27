### motive

- 아래처럼 메인 스레드에서 돌아가는 타이머가 어떤 작업과 함께 돌아갈 시 타이머 자체가 멈추는 현상이 나타나므로 적용 필요함.

### actual assumption

- Dedicated나 백그라운드 사용을 해야 하므로 Service Worker를 사용하면 될듯.
- 절전시에도 돌아가는지? 확인필요

### result

- dedicated 워커로 사용
- 절전시에는 안돌아가는것이 맞음.

## mdn description: Web Workers API

- js의 메인 실행 스레드 이외에서 돌아가는 스크립트. 많은 연산이 필요한 작업의 경우 다른 쓰레드에서 돌아가도록 함으로써 UI가 blocked/slowed down 되는 것을 막는 역할을 한다.

## 1. Web Workers concepts and usage

- 웹 워커란 Worker() 컨스트럭터를 사용하는 오브젝트이다. 워커 쓰레드라는 고유의 쓰레드에서 동작함

- 대부분의 JS코드를 사용 가능하지만 몇가지 예외가 있다

a. DOM 조작
b. window 오브젝트를 참조하는 행위

- 이외에도 https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API#worker_global_contexts_and_functions 서 지원하는 코드들을 알수있다.

## 2. Worker 종류

- Dedicated workers 는 하나의 스크립트를 실행하는 용도이다 DedicatedWorkerGlobalScope 참고.
- Shared workers는 다른 윈도우들에서 여러 스크립트에서 함께 참조하는 용도이다. 포트를 통해서 스크립트 간의 통신이 일어나므로 위의 것보다 더 복잡하다.
- Service Workers는 웹 앱, 브라우저, 네트워크와 연결되는 프록시 서버로써 기능함. 오프라인 상태에서의 UX나 네트워크 요청 중간에 어떤 역할을 수행하거나, 서버와의 통신으로 어떤 작업을 수행할 수 있다.
  또한 푸시 노티피케이션이나 백그라운드 싱크도 담당함.

# NextJS with Web Workers

## 1. Build phase

- static 파일로 shipping되어야 하기 때문에 /public에 넣음.
- cautions! avoid sensitive data such as user data or API keys.

## 2. Setup tsconfig.json

```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./public/workers", // since we want to use .ts file for worker...
    "module": "ES6",
    "noEmit": false
  },
  "include": [
    "workers/**/*.ts"
  ]
}
```

## 3. Update Package.json

will this necessary?

## usage

### methods

- postMessage(): 워커로 데이터를 담은 메시지 보냄

```
worker.postMesage(data)
```

- terminate(): 워커 종료 - 종료 이후에 재시작할 수 없음

```
worker.terminate()
```

- addEventListener(): message, error 이벤트 사용

- removeEventListener()

### properties

- onMessage: 앱에서 받은 메시지를 받는 역할

```
worker.onmessage = function(event) {
  console.log(event.data);
};
```

- onError: 에러 헨들러

```
worker.onerror = function(event) { console.error(event.message); };
```

### types.ts

```
export type WorkerMessageT<T> = {
  type: 'init' | 'data' | 'error' | 'stop'
  payload?: {
    id?: string
    data: T
  }
}

export type CryptoWorkConfigT = {
  assets: string // bitcoin,ethereum,monero,litecoin
}
```

## 2. Usage in ReactJS

다양한 방법이 있겠지만 여기서는 DaedalOS에서의 사용법을 참고했다.

[DaedalOS](https://dustinbrett.com/)

> 다만 실제로는 offscreenCanvas로 state를 받아서 리렌더하는 부분까지 쓰레드를 분리했지만 여기서는 그렇게 하지는 않았음.(더 기능이 추가되어 메인 쓰레드가 blocking된다면 감안할 만함.)

### 2-1. useWorker.ts

```
import { useEffect, useRef } from "react";

const timeWorkerInit = useCallback(
    () =>
      new Worker(
        new URL("components/common/workers/timeWorker", import.meta.url)
        // public에 사용하지 않고 inport.meta.url로 앱 맵 내부에서 불러서 사용할 수 있음.
        // base option param으로 import.meta.url로 웹팩이 가지는 리액트의 프로젝트 파일 주소이다.
      ),
    []
  );

const onMessage = useCallback((data: any) => {
    if (typeof data.data === "number") {
      setLeftSecs(data.data);
    }
    if (data.data === TIMER_STATUS.done) {
      completeOffset();
      setIsStarted(TIMER_STATUS.done);
      // 11/19 need useEffect to handle selectedTask pomodoro counter
      data.target.postMessage({
        action: "switch",
        countdown: getTab.countdown,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // interval이 멈추는 이슈로 인해서 해당 부분 deps를 모두 제거하고 일부러 closure 상태로 만듬
    // 실제 업데이트된 데이터가 필요한 액션은 위 setIsStarted에서 done 상태 변경시 effect로 잡아서 처리함.
}, []);

  const worker = useWorker(timeWorkerInit, onMessage);

```

```

const useWorker = <T>(
  workerInit?: (info?: string) => Worker,
  onMessage?: (message: MessageEvent<T>) => void,
  workerInfo?: string
): React.MutableRefObject<Worker | undefined> => {
  // worker를 ref로 담아서 계속해서 사용할 수 있도록..
  const worker = useRef<Worker>();

  useEffect(() => {
    if (workerInit && !worker.current) {
      worker.current = workerInit(workerInfo);

      // 이벤트리스너에서의 passive는 preventDefault를 부르지 않겠다 -> 새로고침시키기 않겠다는 표시.
      if (onMessage) {
        worker.current.addEventListener("message", onMessage, {
          passive: true,
        });
      }

      worker.current.postMessage("init");
    }

    return () => {
      worker.current?.terminate();
      worker.current = undefined;
    };
  }, [onMessage, workerInfo, workerInit]);

  return worker;
};

export default useWorker;

```

### 2-2. timeWorker.ts

```
let originalTime = 1_500_000;
// eslint-disable-next-line no-undef
// 실제 리액트 실행과 벗어나는 코드이므로 node_modules의 NodeJS 타입을 받을 수 없어서 lint 룰 추가함. 문제없었음.
let timer: NodeJS.Timeout | undefined;
let initialized = false;

const sendTick = () => {
  if (originalTime === 0) {
    globalThis.clearInterval(timer);
    globalThis.postMessage("done");
  } else {
    originalTime -= 1000;
    globalThis.postMessage(originalTime);
  }
};

// lint unicorn error. Self는 모든 환경(nodeJS)에서 통용되는것이 아니므로 globalThis로 교체함.
globalThis.addEventListener(
  "message",
  (e) => {
    // useWorker를 벗어난 실행이라면 종료하도록
    if (!initialized) {
      if (e.data === "init") {
        initialized = true;
      }
      return;
    }

    if (e.data.action === "switch") {
      if (timer) {
        clearInterval(timer);
      }
      originalTime = e.data.countdown;
      postMessage(originalTime);
    }

    if (e.data === "stopped" && timer) {
      globalThis.clearInterval(timer);
    }
    if (e.data === "started") {
      timer = globalThis.setInterval(sendTick, 1000);
    }
  },
  { passive: true }
);

```

## 3. Notable issues

### 3-1. stale closure

문제는 onMessage에서의 stale closure이다.

```
// 여기서 deps를 추가하는 행위는 알 수 없는 이유로 worker의 interval message를 멈추게 만든다.
// 여기 안에서 스테이트 및 컨텍스트를 조회하는 것은 알수없는 이유로 불가함.
// setState는 가능함.(prev는 불가하겠지만)
  const onMessage = useCallback((data: any) => {
    if (typeof data.data === "number") {
      setLeftSecs(data.data); // 워커의 연산결과를 하는것이므로 closure 아님
    }
    if (data.data === TIMER_STATUS.done) {
      completeOffset(); // offset값을 초기화하는 것이므로 closure 아님
      setIsStarted(TIMER_STATUS.done);
      // 11/19 need useEffect to handle selectedTask pomodoro counter
      data.target.postMessage({
        action: "switch",
        countdown: getTab.countdown, // 이 역시 고정된값이므로 괜찮음.
      });
    }
    // 워커가 멈추므로 사용하지 않음.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
```

### 3-2. Race condition completetimer

워커의 문제는 아니지만, 여기 표시함.

아래 completeTimer는

1. 완료 사운드 표시 -> 펑션 나누기 및 사운드 워커 사용 필요
2. 유저가 동의했고 pc환경일 시 노티피케이션 표시 -> 펑션 나누기 및 노티피케이션 워커 사용 필요

- 1과 2는 각각 탭이 active되어있을때 작동되므로 이것도 워커로 맞출 필요 있음 onhold

3. localDB 사용시(현재는 무조건 사용하도록) indexedDB의 태스크에 pomodoroCount 업데이트
4. 컨텍스트의 선택 태스크 pomodoroCount 업데이트
5. 타이머의 스테이트 stopped로 초기화

의 순을 거치게 되는데,

4.은 중앙 context action으로 빨리 종료됨 5. 은 로컬 state action으로 4.보다 느리게 처리되므로

4. 이 완료된 이후 5.이 실행되기 전 아래 이펙트가 계속해서 실행되어 무한 루프 에러 표시됨.

- 임시 해결책으로 5.을 먼저 실행하고 4.을 setTimeout 처리하는 식으로 실행순서를 늦추어 주었음.

```
// useTimerControl.
// 위 done status를 처리하는 로직은 다음과 같음.

  useEffect(() => {
    if (isStarted === TIMER_STATUS.done) {
      completeTimer();
    }
  }, [isStarted, completeTimer]);

    const completeTimer = useCallback(() => {
    const audio = new Audio(Microwave);
    audio.play();
    launchCompleteNotification(title);
    if (title === "pomodoro" && selectedTask?.id > -1) {
      if (isUseLocalDBOrNot() && getDB) {
        const transaction = getDB.transaction(["tasks"], "readwrite");
        const request = transaction.objectStore("tasks");
        const get = request.get(selectedTask.id);
        get.onsuccess = () => {
          request.put({
            ...get.result,
            pomodoroCount: get.result.pomodoroCount + 1,
          });
        };
      }

      setIsStarted(TIMER_STATUS.stopped);

      // jury rigged but it works. I can use useDebounce or other solution to isolate context action.
      setTimeout(
        () =>
          setTask(
            getTasks.map((t) =>
              t.id === selectedTask.id
                ? {
                    ...t,
                    pomodoroCount: t.pomodoroCount + 1,
                  }
                : t
            )
          ),
        1000
      );
    }
  }, [
    getDB,
    getTasks,
    launchCompleteNotification,
    selectedTask.id,
    setTask,
    title,
  ]);

```

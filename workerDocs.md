web worker부터 다시 확인하기.

### motive

- 아래처럼 메인 스레드에서 돌아가는 타이머가 어떤 작업과 함께 돌아갈 시 타이머 자체가 멈추는 현상이 나타나므로 적용 필요함.

### actual assumption

- Dedicated나 백그라운드 사용을 해야 하므로 Service Worker를 사용하면 될듯.
- 절전시에도 돌아가는지? 확인필요

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

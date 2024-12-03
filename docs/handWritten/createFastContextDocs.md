# Summary

- 해당 모듈을 사용해 외부 라이브러리 없이 context를 기반한 자체 상태 관리를 적용할 수 있었음.
- useSyncExternalStore 의 개발자 설명을 보았을때 외부 상태관리 라이브러리 역시 해당 api를 사용하고 있는 것으로 예상할 수 있었음.
  > 관련 내용은 맨 아래 api 설명을 참고.
- 다만 NextJS의 서버 컴포넌트와는 관련 없는 CSR이기 떄문에 서버 관련해서는 추가적인 확인 및 코딩을 해볼 필요가 있겠다. 리액트 docs에서도 서버 컴포넌트 지원이 있음.

## Motives

- 외부 라이브러리를 사용하지 않고(복잡성을 줄이고) 리액트 바닐라 기능을 사용해서 모든 자식이 rerender되지 않는 중앙 데이터 처리를 하고싶었기 때문에 사용하였음.

- 공식 docs 에서 외부 데이터를 사용하는 것이 아니라면 왠만하면 useState와 useReducer를 권장하지만, 여기서는 데이터를 중앙처리하는것을 목적으로 삼았고 rerender를 방지하려고 했으므로 사용되었음.

## Assumptions

- 실제로 제대로 작동할 것인가?

## Actual Results

- 실제로 작동하는 데 문제는 없었음.
- 다만 프로젝트 구조 상 수정하는 과정에서 selector를 나누어 rerender를 막고 싶었지만, 현재는 맨 상위 AppContainer에서 모든 context를 부르고 있기 때문에 불필요한 rerender가 발생함.

## Current Use-Case

- 기존 context: 리액트의 state를 context store로 받는 Provider wrapper를 리턴해서 내부에서 useContext로 같이 조회함.
- 이 경우 useContext를 받는 모든 컴포넌트가 리렌더 시 불필요하게 리렌되기 때문에, useRef를 사용해서 store를 context에 저장, 필요한 곳에만 리렌더하는 방식.
- 하지만 useRef의 경우 rerender 시 조회하는 부분에서 리랜더를 일으키지 않기 떄문에, useSyncExternalStore로 따로 싱크해주는 작업이 필요함.
- useSyncExternalStore는 pub sub 모델을 적용해서 sub = 데이터를 사용하는 컴포넌트들, pub = externalStore 자체로 구현되게 됨.
- 내부 구조에 대해서 이 이상의 기록은 하지 않음. 필요하다면 youtube를 한번 더 보는 것이 도움이 될 것.

```

// contexts/PomodoroContext.ts

import createFastContext from "components/contexts/createFastContext";
import { type TabWithMutableCountdown, type TimerType } from "@/types/Timer";
import { TABS, TIMER_STATUS } from "@/components/Timer/constants";

// 여기서 확인할 수 있는 것처럼, 내부에서 Provider와 자식 컴포넌트에서 사용할 useFastContextFields을 리턴함.
export const {
  FastContextProvider: PomodoroProvider,
  useFastContextFields: usePomodoro,
} = createFastContext({
  tab: TABS[0] as TabWithMutableCountdown,
  isStarted: TIMER_STATUS.stopped as TimerType,
});

<PomodoroProvider>
  {children} // 여기 이하는 useFastContextFields을 사용할 수 있다.
</PomodoroProvider>

// Timer/index.tsx

  const {
    tab: { set, get },
  } = usePomodoro(["tab"]);

  와 같은 방법으로 사용할 오브젝트 키를 추가하고, setter와 getter를 불러와서 사용한다.

```

## Drawbacks

Mention any limitations or challenges.

## Additional Notes

Include other relevant information

## References

## [createFastContext](https://www.youtube.com/watch?v=ZKlXqrcBx88&ab_channel=JackHerrington)

## [Why use useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)

### useSyncExternalStore

```
// React Hook that lets you subscribe to an external store.

const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)

```

```
Notice!!

When possible, we recommend using built-in React state with useState and useReducer instead. The useSyncExternalStore API is mostly useful if you need to integrate with existing non-React code.

위 왜사용했는지 참조.

```

가장 상위 레벨에서 외부 데이터 스토어의 밸류를 참조하는 용도로 사용함. -> 다른 상태 관리 라이브러리의 사용과 동일하다.

```
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  // subscribe: 하나의 콜백을 패럼으로 받는 펑션. 스토어가 바뀌면 리턴하면서 getSnapshot도 재실행한다. 클린업 펑션을 리턴한다.
  // getSnapshot: 해당 스토어의 스냅샷을 가져온다.
  // getServerSnapshot ?: 이니셜 스냅샷을 리턴한다. 서버 렌더링 시 사용함. 사용하지 않을 시 서버 렌더링 시 에러.

```

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);
    사용예
    해당 콜백으로 ref인 new Set()에 콜백을 저장함. 스토어가 바뀌면 리턴 펑션이 발생하면서 파괴된다.

    const get = useCallback(() => store.current, []);
    사용예
    스토어의 스냅샷 리턴.

}

```
// This is an example of a third-party store
// that you might need to integrate with React.

// If your app is fully built with React,
// we recommend using React state instead.

let nextId = 0;
let todos = [{ id: nextId++, text: 'Todo #1' }];
let listeners = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'Todo #' + nextId }]
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  }
};

// 리턴함으로써 listener가 리턴되고 다시 subscribe가 실행되는거 주목.
function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}


```

- getSnapshot의 데이터는 immutable 해야한다. 사용예에서 useRef로 가져온 값을 .current로 불러왔다.
- subscribe 역시 rerender 시 모든 레퍼런스를 잃을 수 있다. 사용예에서도 이를 별도의 파일로 구현에서 컴포넌트 바깥에서 사용한다.
- 해당 스냅샷의 데이터로 불러오는 render를 suspend하는 것은 권장되지 않음. 해당 데이터는 non-blocking transition updates로 분류하기 떄문에 이미 렌더된 컨텐츠 역시 suspense의 폴백을 불러올 수 있다. -> 사용예에서는 이를 컨텍스트에 담아서 문제 해결

```
const LazyProductDetailPage = lazy(() => import('./ProductDetailPage.js'));

function ShoppingApp() {
  const selectedProductId = useSyncExternalStore(...);

  // ❌ Calling `use` with a Promise dependent on `selectedProductId`
  const data = use(fetchItem(selectedProductId))

  // ❌ Conditionally rendering a lazy component based on `selectedProductId`
  return selectedProductId != null ? <LazyProductDetailPage /> : <FeaturedProducts />;
}
```

#### 위의 방법외에도 다양한 사용예가 있다.

##### 1. 바깥 스토어에서 데이터 참조 - 제외

##### 2. 브라우저 api 조회

- 브라우저 api 로 리턴하는 데이터는 리액트의 렌더 페이즈 바깥이므로 이를 넣어서 사용 가능함.

```
import { useSyncExternalStore } from 'react';

function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  // ...
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}
```

##### 커스텀 훅 로직을 뺄때

- useSyncExternalStore 을 커스텀 훅에 선언해서 사용 가능함. 이 경우 같은 외부(브라우저) 소스에서 같은 시점의 레퍼런스 스냅샷을 받아볼 수 있다.

```
// useOnlineStatus
import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

// 해당 훅을


function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

해당 두컴포넌트에서 동일한 데이터로 사용 가능함.

```

##### 3. 서버 렌더링 시

```
import { useSyncExternalStore } from 'react';

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return isOnline;
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true; // Always show "Online" for server-generated HTML
}

function subscribe(callback) {
  // ...
}

```
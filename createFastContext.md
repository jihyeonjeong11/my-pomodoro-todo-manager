## [Why use useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore)

- 외부 라이브러리를 사용하지 않고(복잡성을 줄이고) 리액트 바닐라 기능을 사용해서 모든 자식이 rerender되지 않는 중앙 데이터 처리를 하고싶었기 때문에 사용하였음.

- 공식 docs 에서 외부 데이터를 사용하는 것이 아니라면 왠만하면 useState와 useReducer를 권장하지만, 여기서는 데이터를 중앙처리하는것을 목적으로 삼았고 rerender를 방지하려고 했으므로 사용되었음.

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

```
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

### 해당 컨텍스트의 의도

#### [공식 업데이트 로그의 설명](https://github.com/reactjs/rfcs/blob/main/text/0214-use-sync-external-store.md)

```
This API is designed to be used primarily by library and framework authors, not by the typical React developer. However, the API is simple enough that we expect most users can pick it up with minimal effort by reading the documentation.
```

- 라이브러리나 프레임워크를 사용하는데 도움을 주기위해서임.
- 하지만 이 경우는 context로 외부 라이브러리 사용을 줄이되 리렌더를 막기위해서 솔루션을 찾았고 정상작동하는 것을 확인했음.

### 어떻게 사용하는지?

-

### 반성

-

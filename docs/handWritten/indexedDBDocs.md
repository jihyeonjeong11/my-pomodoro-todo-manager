# 1. Summary

- localStorage가 아닌 좀 더 DB를 사용하는 느낌으로 사용한다면 충분히 괜찮을 수 있음
- 바닐라로 사용해서 callback 처리에 어려움이 있었음. 관련 라이브러리를 사용하는것이 좋아보이지만, 다음 프로젝트에서도 indexedDB를 사용할지는 잘 모르겠음.
- 가장 문제는 web app의 거의 필수기능이라고 할 수 있는 로그인 관련 기능을 구현하기가 애매하다는 것.(자체인증을 할것이 아니라면)
- 크게 코드가 짜임새있거나 클리닝 된것이 아니고, 크게 문제없는한 이대로 둘 듯함.

# 2. Motive

- localStorage보다 좀 더 최신의 솔루션을 사용해보고자 했음.

# 3. My use-cases

- 두 가지의 훅이 사용됨
- useIndexedDBConnection: 브라우저의 indexedDB 인스턴스를 호출해서 가능여부를 담아둠. 성공한다면 기본 scheme 추가, 실패하면 리턴 이후 indexedDB 호출 안함.
- useIndexedDB: 실제 데이터 핸들링 로직이 담겨있음.

```
// useIndexedDBConnection

const useIndexedDBConnection = (
  getStatus: StatusType,
  setStatus: (value: StatusType) => void, // fastContext 의 db 접속 여부 값
  getDB: IDBDatabase | null, // fastContext의 db 인스턴스 값
  setDB: (value: IDBDatabase | null) => void

)
```

# 4. References

[MDN indexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

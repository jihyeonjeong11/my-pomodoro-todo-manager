https://daringfireball.net/projects/markdown/basics
// basics

https://docs.github.com/en/get-started/writing-on-github
// github flavored rules

https://google.github.io/styleguide/docguide/style.html
// google recommendation

been building from May 29, 2024

# Project Summary

생산성을 높이기 위해서 만들었다.

It's a lightweight single-page web application for Pomodoro method training.
Users can add, remove, sort tasks with attaching Pomodoro timer to track their doing it.

This Web app uses browser storage(indexedDB) for persisting User's task information, which is currently built on.

## 1. 프로젝트 구조

1. 왜 NextJS인가?

   - 아직 현업에서 쓴 경험이 없다고 하더라도, 현재 시장 지배적이므로 사용해야 한다고 생각했음.

2. 왜 page router인가?

   - 회사에서 기존 NextJS를 유지하면서 app router로 바꾼 경우가 많이 없다고 들었다. 물론 해당 프로젝트는 SPA를 구현한 것으로 MPA와는 사용법이 다르겠지만, 굳이 app router를 사용할 필요는 없다고 생각했음. 하지만, SPA이고 해당 페이지가 CSR이며 백엔드도 indexedDB로 브라우저 단에서 사용한 결과물을 볼 때 app router라도 괜찮았다고 생각이 듬. 다음에는 MPA를 page router로 MPA를 구현하는 것이 맞지 않나 함.

3.

## 2. 핵심 구조

1. createFastContext

   - 다른 md 파일 참조

2. 왜 styled-in-js를 사용했는지?

   - tailwinds와 비교할것

3. indexedDB를 사용한 이유
4. 오브젝트로 로딩 모달을 구현한 이유?

## 3. 앱 ux

1. 실제로 사용한 뒤 어땠는지?

   - 25분단위 작업 5분 휴식 이외에도 25분 단위로 할 수 있도록 계속 task를 쪼개게 되기 때문에 좋음.

2. 아쉬운 것은?

   - 일부러 타이머 애니메이션을 가져와서 제작했지만, 실제로 사용하지 않았음. 제거해도 무방.

3. 왜 컴플리트를 수동으로 처리했는지?

   - 25분 작업이 끝났을때 끝나지 않는 경우도 있었기 때문.

4.

## 4. 자신의 코딩 스타일

-

## 1. Why NextJS?

2. Why Page Router?

회사에서 기존 NextJS를 유지하면서 app router로 바꾼 경우가 많이 없다고 들었다. 물론 해당 프로젝트는 SPA를 구현한 것으로 MPA와는 사용법이 다르겠지만, 굳이 app router를 사용할 필요는 없다고 생각했음.

3. Why Styled Component?

더 자세한것은 docs를 확인해봐야 하겠지만, 빌드 과정에서 서버 컴포넌트와 잘 맞지 않는다고 보았었다. TailwindsCSS처럼 nextJS와 더 맞는 대안이 있다고 생각한다. 또한 css-in-js 역시 하나의 패러다임일 뿐.. 개인 취향이라고 생각함.

- better use tailwinds next time.

4. Why IndexedDB?

유저 인증(로그인)을 만들지 않는 과정에서 데이터를 저장하는 가장 나은 방법이 아닐까 해서 사용했다. 하지만 데이터의 복잡성이 크지는 않기 때문에, 현재로써는 추가 기능이 없다면 더 전통적인 기능 localStorage에 비해 복잡성이 크다고 생각한다.

## 2. Your preparations

1. eslint rule
   airbnb 룰과 unicorn룰을 대부분 따라가도록 노력했다.

2. testing
   jest로 커버리지를 최대한 넣었지만, 효율적이지 않다고 생각한다. 무엇보다 컴포넌트, 훅 하나하나의 테스트를 따로 만드는 것이 생산성 부분에서 도움이되지 않는다고 생각한다. 다음에는 playwright를 사용해 실제 유저 스토리를 테스트로 만들 수 있다고 하니 한번 해보려고 한다.

3. typescript
   내가 생각하기에 타입스크립트는 맨 상위에서 데이터를 받아오면서 맨 아래 렌더링되는 컴포넌트에서 지네릭한 타입을 받아서 재사용성을 높이는 것이 최고라고 생각한다. 이 프로젝트에서는 재사용되는 버튼이나 컴포넌트들이 많지않아 그렇게 작업하지는 않았지만, 재사용성이 필요하게 된다면 그렇게 할 것 같다.

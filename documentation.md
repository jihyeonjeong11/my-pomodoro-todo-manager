https://daringfireball.net/projects/markdown/basics
// basics

https://docs.github.com/en/get-started/writing-on-github
// github flavored rules

https://google.github.io/styleguide/docguide/style.html
// google recommendation

been building from May 29, 2024

# Project Summary

It's a lightweight single-page web application for Pomodoro method training.
Users can add, remove, sort tasks with attaching Pomodoro timer to track their doing it.

This Web app uses browser storage(indexedDB) for persisting User's task information, which is currently built on.

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

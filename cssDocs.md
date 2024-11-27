왜 cssInJS인가?
nextJS에서 cssInJS가 좋은가 tailwindCSS가 좋은가?
나는 어떻게 cssInJs를 썼는가?

# 2024 기준 css 추천하는 방법

- css modules
  e.g.) Container.module.css

- CSS in JS
  e.g.) Styled components

- Utility framework
- e.g.) TailwindCSS

## CSSInJS 사용한 이유

- 사실 큰 이유는 없었음. 지금와서 생각해보면 css modules로 로컬 스코프만을 가져도 충분했을 수 있음
- 하지만 실제 theme을 구성할 때 Styled components가 많은 도움이 되었음.
- Tailwindcss는 고려하지 않았음. 이전부터 쭉 사용해 온 것이므로.. 작업 중 실제 css 프로퍼티를 쓰면서 도움이 된 것이 사실임.

- 결론: 시작할 때 큰 이유는 없었다. 하지만 theme 구현에 있어서 module css에 비해 편리했던 것은 확실하다.
- 그리고 tailwind 및 styledcomponents 역시 방대한 양이므로 둘 중 어떤것의 숙련도를 높이는 것이 절대 손해는 아닐 것이다.
- 현재 사용 방향은 color와 size를 모두 tailwinds에서 관리하고 있어서, 이 부분이 가독성에 도움이 된다.

[reference from reddit](https://www.reddit.com/r/reactjs/comments/sqxwlf/why_was_cssinjs_ever_a_thing/)

## classname을 적게 쓸 수 있다.

- You get single file components (CSS/HTML/JS all in a single file). Context really matters on large applications.
- 내가 지향한 방향과 같음. 최대한 인식하기 쉽게 하나의 파일에 Styled를 넣어놓고 자식 컴포넌트까지 입력해줌.

- You can have typed styles. You can ensure developers are using "classes" that exist and only classes that exist. You can even enforce values with certain frameworks.
- 스타일의 타입을 지정할 수 있음. 클래스를 찾아가는 것이 힘들 수 있기 때문에. -> 이 부분은 문제가 될 수 있음. 타입 역시 많아지면 클래스보다 더 찾기 힘들어질 수 있다.

- You often have "styled components", making components easy to re-use.
- 여기서는 재사용 컴포넌트는 존재하지 않지만 a.와 마찬가지로 큰 규모의 앱에서 도움이 될 수 있음

## 내가 사용한 방향

```
//styledList.ts

export const StyledList = styled.section`
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 24rem;
  text-align: center;
  justify-content: center;
  align-items: center;

  // styledInnerList
  div {
    ...
  }
`;

// 변경예정
// 하나의 styled 태그 안에 자식들을 모두 넣어놓고 자식 컴포넌트는 따로 커멘트로 처리함.

```

# StyledComponent의 theme 기능을 nextJS에서 사용하는 것을 기록.

[reference](https://styled-components.com/docs/advanced#theming)

## 참조

- css 디버깅을 위해서는 박스모델 체킹이 되는 firefox를 사용하라고 함.(추후 확인해볼 것.)

## global.css

styled component themeProvider의 상위, css reset을 위해 사용함.

## 1. 테마 정의

```
// pages/index.tsx 에서 themeProvider 및 theme 사용.

    <main>
      <ThemeProvider theme={themes.defaultTheme}>
        <MainPage />
      </ThemeProvider>
    </main>
```

- 해당 테마는 Root/styles 폴더에 들어가 있음
- useTheme을 사용하도록 size에 넣게 해야함.

  이거 themes에 넣자.

  그 외에는 딱히 참조할 것이 없을 듯 하고
  theme switch 정도 넣어주면 좋을 듯함.

```



```

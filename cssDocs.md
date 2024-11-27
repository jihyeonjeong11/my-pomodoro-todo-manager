# Summary

- Styled components 테마 기능으로 컬러와 사이즈같은 constants value를 편하게 관리할 수 있었음
- 하지만 next 공식 docs에서는 서버 컴포넌트 작업 시 css module이나 tailwindCSS를 권장하므로 MPA 작업시에는 styledcomponent보다 해당 방법을 사용하는 것이 좋아보임.

## Motive

- 하나 혹은 하나 이상의 테마를 통해 css를 컨트롤 할 수 있다.
- 한 컴포넌트의 css는 되도록 하나의 파일에서 끝내도록 한다.
- 중복되는 값이나, 중복되는 태그일 경우 클래스네임으로 구분한다.
  e.g.) spacing - 공통 패딩 밸류
  e.g.) motion-button Tasklist 컴포넌트 아래 div가 중첩되는 경우 클래스네임으로 구분
- nextJS와 충돌이 없어야 한다.

## Assumptions: What to use? - 2024 기준 css 추천하는 방법

- css modules
  e.g.) Container.module.css

- CSS in JS
  e.g.) Styled components

- Utility framework
- e.g.) TailwindCSS

## CSSInJS 사용한 이유

- 사실 큰 이유는 없었음. 지금와서 생각해보면 css modules로 로컬 스코프만을 가져도 충분했을 수 있음
- 하지만 실제 theme을 구성할 때 Styled components가 많은 도움이 되었음.
- Tailwindcss는 고려하지 않았음. 이전부터 쭉 사용해 온 것이었지만 그것보다는 styled-component처럼 실제 css값을 넣으면서 작업하고 싶었음.

- 결론: 시작할 때 큰 이유는 없었다. 하지만 theme 구현에 있어서 module css에 비해 편리했던 것은 확실하다.
- 그리고 tailwind 및 styledcomponents 역시 방대한 양이므로 둘 중 어떤것의 숙련도를 높이는 것이 절대 손해는 아닐 것이다.
- 현재 사용 방향은 color와 size를 모두 tailwinds에서 관리하고 있어서, 이 부분이 가독성에 도움이 된다.

[Next official docs](https://nextjs.org/docs/app/building-your-application/styling/css-in-js)

- 서버 렌더링시 컴포넌트를 스타일 하려고 한다면 CSS Modules을 사용하거나, postCSS 혹은 TailwindCSS를 권장한다고 표기되어 있다.

## CssInJs의 장점. classname을 적게 쓸 수 있다.

[reference from reddit](https://www.reddit.com/r/reactjs/comments/sqxwlf/why_was_cssinjs_ever_a_thing/)

- You get single file components (CSS/HTML/JS all in a single file). Context really matters on large applications.
- 내가 지향한 방향과 같음. 최대한 인식하기 쉽게 하나의 파일에 Styled를 넣어놓고 자식 컴포넌트까지 입력해줌.

- You can have typed styles. You can ensure developers are using "classes" that exist and only classes that exist. You can even enforce values with certain frameworks.
- 스타일의 타입을 지정할 수 있음. 클래스를 찾아가는 것이 힘들 수 있기 때문에. -> 이 부분은 문제가 될 수 있음. 타입 역시 많아지면 클래스보다 더 찾기 힘들어질 수 있다.

- You often have "styled components", making components easy to re-use.
- 여기서는 재사용 컴포넌트는 존재하지 않지만 a.와 마찬가지로 큰 규모의 앱에서 도움이 될 수 있음

# My use-case

## global.css

styled component themeProvider의 상위, css reset을 위해 사용함.

## 1. Basic usage

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

  // 자식 컴포넌트
  div {
    ...
  }
`;

// 하나의 styled 태그 안에 자식들을 모두 넣어놓고 자식 컴포넌트는 따로 커멘트로 처리함.

```

## 2. Theming

[reference](https://styled-components.com/docs/advanced#theming)

```
// pages/index.tsx 에서 themeProvider 및 theme 사용.

import { ThemeProvider } from "styled-components";
import MainPage from "components";
import themes from "styles/themes";
import { useState } from "react";
import { SvgSun, SvgMoon } from "@/public/media/icons";

export default function Home() {
  const [theme, setTheme] = useState<"defaultTheme" | "lightTheme">(
    "defaultTheme"
  );
  return (
    <main>
      <nav className="upper-nav">
        <button
          type="button"
          onClick={() =>
            setTheme((prev) =>
              prev === "defaultTheme" ? "lightTheme" : "defaultTheme"
            )
          }
        >
          {theme === "defaultTheme" ? <SvgSun /> : <SvgMoon />}
        </button>
      </nav>
      <ThemeProvider theme={themes[theme]}>
        <MainPage />
      </ThemeProvider>
    </main>
  );
}

```

## 3. theme switching

- 테마를 바꿀 수 있도록 맨 상위 layout에 svg 버튼을 두었음. -> 올바른 approach인지?
- 위 next docs에 따르면, server components를 위해서는 다른 방법을 권장한다고 하니.. 하지만 현재는 모든 파일이 client rendering이므로 문제 없을 듯함.
- 서버 렌더링에서의 테마 변경은 차후 확인예정.

## 4. css constants

```
import { type DefaultTheme } from "styled-components";
import { colors, lightColors } from "@/styles/colors";
import sizes from "@/styles/sizes";

const defaultTheme: DefaultTheme = {
  colors,
  sizes,
} as const;

const lightTheme: DefaultTheme = {
  colors: lightColors,
  sizes,
} as const;

const themes = { defaultTheme, lightTheme };

export type ThemeName = keyof typeof themes;

export default themes as Record<ThemeName, DefaultTheme>;

// colors

export const colors = {
  // for dark-blue
  timer: {
    pomodoroTitle: "#ffffff",
    navBackground: "#161932",
    text: "#d7e0ff",
    selectionHighlight: "#f87070",
    mainBackground: "#1e213f",
  },
  tasklist: {
    completedTitle: "#d7e0ff",
    text: "#ffffff",
  },
};


```

- colors와 sizes는 그냥 값을 가지고 있는 오브젝트로 사용함.
- lightTheme은 chatGPT로 생성되었음.
- size의 경우, framer motion에서 사용되는 부분이 있어 useTheme 훅이 사용되었음.

## 5. useTheme

```
// useCircleOffset.ts
const useCircleOffset = (
  title: TabWithMutableCountdown["title"],
  countdown: number,
  decrementor: number,
  leftSecs: number,
) => {
  const { sizes } = useTheme() as { sizes: Sizes };

  const [circleOffset, setCircleOffset] = useState(
    sizes.timer.defaultCircleOffset,
  );

    const completeOffset = useCallback(
    () => setCircleOffset(sizes.timer.defaultCircleOffset),
    [sizes.timer.defaultCircleOffset],
  );
  ...
}
```

- 위 theme에 저장된 constants 값을 가져올 수 있도록 useTheme이 사용된 코드 예시.
- 아래 useCallback 예시에서는 해당 값이 바뀔 때(다른 테마로 변경되었을 때 혹시 다른 값이 온다면) 사용할 수 있도록 dependency graph에 넣어두고 쓰게 된다.

## 6. dynamic props

- 새로운 Styled tag를 만들어서 props를 받고 사용한다.

```

<StyledTaskTitle
        $isactive={getSelectedTask.id === id && !isCompleted}
        $iscompleted={isCompleted}
      >
        {title} {pomodoroCount}
      </StyledTaskTitle>

export const StyledTaskTitle = styled(TaskTitle)`
  color: ${(props) =>
    props.$isactive
      ? `${props.theme.colors.timer.selectionHighlight}`
      : `${props.theme.colors.tasklist.text}`};
  text-decoration: ${({ iscompleted }) =>
    iscompleted ? "line-through" : "none"};
`;

```

## 추후 참조

> css 디버깅을 위해서는 박스모델 체킹이 되는 firefox를 사용하라고 함.(추후 확인해볼 것.)

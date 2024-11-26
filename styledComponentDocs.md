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
  export const DEFAULT_CIRCLE_OFFSET = 0;
  export const DEFAULT_TASKFORM_HEIGHT = 110;
  export const TASKFORM_PADDING = 50;
  이거 themes에 넣자.

  그 외에는 딱히 참조할 것이 없을 듯 하고
  theme switch 정도 넣어주면 좋을 듯함.

```



```

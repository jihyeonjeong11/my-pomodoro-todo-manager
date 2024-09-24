## **My Pomodoro Timer and Task manager**

[![포모도로 앱](./public/media/images/preview.png)]

## [포모도로란?](https://ko.wikipedia.org/wiki/%ED%8F%AC%EB%AA%A8%EB%8F%84%EB%A1%9C_%EA%B8%B0%EB%B2%95)

# Features ✨

### Internal State management using useContext pirated by:

[![Fast Context](https://img.youtube.com/vi/ZKlXqrcBx88/mqdefault.jpg)](https://www.youtube.com/watch?v=ZKlXqrcBx88&t=669s)

### [Framer motion](https://github.com/framer/motion)

### Tab-controlled timer

- 포모도로 방식에 맞춘 3개의 선택 가능한 탭
- 애니메이션된 svg 시계
- 포모도로 시간 추적을 위한 동적 앱 헤드
- [웹 알림](https://developer.mozilla.org/en-US/docs/Web/API/Notification)

### Tasklist

- [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)를 통한 영구적인 작업 저장소 (계획 중)
- 작업 추가, 삭제, 드래그 앤 드롭을 통한 순서 변경

# Try It 🚀

##### Requirements

- [Node.js 18 이상](https://nodejs.org/en/download/)
- [Pnpm](https://pnpm.io/)

##### Development

```
pnpm install
pnpm dev
```

##### Production

```
pnpm install
pnpm build
pnpm start
```

##### Docker

```
docker build -t pomodoro .
docker run -dp 3000:3000 --rm --name pomodoro pomodoro
```

##### Notes

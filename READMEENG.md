## **My Pomodoro Timer and Task manager**

[![Feature Overview](./public/media/images/preview.png)]

## [About Pomodoro](https://ko.wikipedia.org/wiki/%ED%8F%AC%EB%AA%A8%EB%8F%84%EB%A1%9C_%EA%B8%B0%EB%B2%95)

# Features ✨

### Internal State management using useContext pirated by:

[![Fast Context](https://img.youtube.com/vi/ZKlXqrcBx88/mqdefault.jpg)](https://www.youtube.com/watch?v=ZKlXqrcBx88&t=669s)

### [Framer motion](https://github.com/framer/motion)

### Tab-controlled timer

- 3 Selectable tabs for Pomodoro technique
- Animated svg clock
- Dynamic app head for Pomodoro time tracking
- [Web Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notification)

### Tasklist

- Persisting task storage powered by [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (Planned)
- Post, Delete, Reorder by dragging and dropping

# Try It 🚀

##### Requirements

- [Node.js 18 or above](https://nodejs.org/en/download/)
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

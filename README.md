# My side project. Pomodoro timer + Todo manager.

# Dev env docker by:

[https://github.com/vercel/next.js/tree/canary/examples/with-docker]

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t nextjs-docker .`.
1. Run your container: `docker run -p 3000:3000 nextjs-docker`.

You can view your images created with `docker images`.

### In existing projects

To add support for Docker to an existing project, just copy the [`Dockerfile`](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile) into the root of the project and add the following to the `next.config.js` file:

```

// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: "standalone",
};
```

https://codesandbox.io/p/sandbox/pomodoro-app-czqyn?file=%2Fsrc%2FSass%2FGlobal.scss
https://codesandbox.io/p/sandbox/framer-motion-tabs-tjow1?file=%2Fsrc%2FTabs.js%3A14%2C22

// flip timer animation source
https://www.frontendmentor.io/solutions/launch-countdown-timer-with-flip-animation-SyrQqQjz9

context not causing unintended rerender?
https://www.youtube.com/watch?v=ZKlXqrcBx88&t=1179s

// RAF timer logic
https://codesandbox.io/s/requestanimationframe-pausable-timer-knsmy

// framer motion animation Wrap-up (for blogging)
https://www.youtube.com/watch?v=kep_Iaxuzy0&t=339s
https://www.youtube.com/watch?v=ILxNdOtKbNQ

// and task list.(v1, just a list, v2 will be pushed later)

07/18: free language ai model for ai generated task list: Google gemini or else.
https://ai.google.dev/gemini-api/docs

https://dev.to/musselmanth/re-rendering-react-components-at-breakpoint-window-resizes-a-better-way-4343

### Reset css

https://www.joshwcomeau.com/css/custom-css-reset/

### Planned library usage:

1. React-rnd : todo-window
2. framer-motion : animation?
3. Styled-components : css-in-js maybe
4. React-virtuoso : maybe Alternatives: react-window react-virtualized or make it on my own

### Testing

07/01: Timer funcionality not can be tested with Jest(unless using faketimer or I mislead the docs.)

from nextjs docs: Good to know: Since async Server Components are new to the React ecosystem, Jest currently does not support them. While you can still run unit tests for synchronous Server and Client Components, we recommend using an E2E tests for async components.

I can start with testing-library with jest, and moving to Cypress.

### Features

1. Clock
2. ToDo list

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

```js
// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: "standalone",
};
```

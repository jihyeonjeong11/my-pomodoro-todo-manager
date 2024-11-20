let originalTime = 1_500_000;
// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout | undefined;
let initialized = false;

const sendTick = () => {
  if (originalTime === 0) {
    globalThis.clearInterval(timer);
    globalThis.postMessage("done");
  } else {
    originalTime -= 1000;
    globalThis.postMessage(originalTime);
  }
};

globalThis.addEventListener(
  "message",
  (e) => {
    if (!initialized) {
      if (e.data === "init") {
        initialized = true;
      }
      return;
    }

    if (e.data.action === "switch") {
      if (timer) {
        clearInterval(timer);
      }
      originalTime = e.data.countdown;
      postMessage(originalTime);
    }

    if (e.data === "stopped" && timer) {
      globalThis.clearInterval(timer);
    }
    if (e.data === "started") {
      timer = globalThis.setInterval(sendTick, 1000);
    }
  },
  { passive: true },
);

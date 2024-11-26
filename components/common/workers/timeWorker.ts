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
        // Health check
        globalThis.postMessage("source");
      }
      return;
    }

    if (e.data.action === "switch") {
      if (timer) {
        globalThis.clearInterval(timer);
      }
      originalTime = e.data.countdown;
      globalThis.postMessage(originalTime);
    }

    if (e.data.action === "stopped" && timer) {
      globalThis.clearInterval(timer);
    }
    if (e.data.action === "started") {
      timer = globalThis.setInterval(sendTick, 1000);
    }
  },
  { passive: true },
);

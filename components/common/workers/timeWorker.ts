let originalTime = 1_500_000;
// eslint-disable-next-line no-undef
let timer: NodeJS.Timeout | undefined;

globalThis.addEventListener("message", (e) => {
  if (e.data.action === "switch") {
    if (timer) {
      clearInterval(timer);
    }
    originalTime = e.data.countdown;
    postMessage(originalTime);
  }

  if (e.data === "started") {
    timer = setInterval(() => {
      if (originalTime === 0) {
        clearInterval(timer);
        postMessage("done");
      } else {
        originalTime -= 1000;
        postMessage(originalTime);
      }
    }, 1000);
  }

  if (e.data === "stopped" && timer) {
    clearInterval(timer);
  }
});

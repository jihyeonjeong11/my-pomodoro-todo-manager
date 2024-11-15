let originalTime = 1_500_000;
let timer;

globalThis.addEventListener("message", (e) => {
  if (e.data === "started") {
    timer = setInterval(() => {
      originalTime = originalTime - 1000;
      postMessage(originalTime);
    }, 1000);
  }

  if (e.data === "stopped") {
    if (timer) {
      clearInterval(timer);
      timer = null;
      originalTime = 1_500_000; // Reset time
    }
    postMessage("stopped");
  }

  // if (e.data === "stopped") {
  //   console.log("stopped");
  //   originalTime = 1_500_000;
  //   clearInterval(interval);
  // }

  // return () => {
  //   console.log("returned");
  //   if (interval) clearInterval(interval);
  // };
});

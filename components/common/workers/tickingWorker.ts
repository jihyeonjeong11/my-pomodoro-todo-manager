// eslint-disable-next-line no-undef
let tickingInterval: NodeJS.Timeout | undefined;

globalThis.addEventListener("message", (e) => {
  const result = e.data;

  if (result.startsWith("ticking-start")) {
    const interval = Number.parseInt(result.split("_")[1], 10);
    tickingInterval = setInterval(() => {
      postMessage("ticking-switch");
    }, interval * 1000);
  }

  if (result === "ticking-stop") {
    clearInterval(tickingInterval);
  }
});

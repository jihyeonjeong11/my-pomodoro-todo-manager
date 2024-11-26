// for styled-components
export const colors = {
  // for dark-blue
  timer: {
    pomodoroTitle: "#ffffff",
    navBackground: "#161932",
    text: "#d7e0ff",
    selectionHighlight: "#f87070",
    mainBackground: "#1e213f",
  },
  tasklist: {
    completedTitle: "#d7e0ff",
  },
};

export const lightColors = {
  ...colors,
  timer: {
    ...colors.timer,
    mainBackground: "red",
  },
};

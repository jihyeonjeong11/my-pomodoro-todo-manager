export const toggleMainTaskWindow = (
  isToggled: boolean,
  prev: any,
  cb: any
) => {
  if (isToggled) {
    const updatedWindows = { ...prev };
    delete updatedWindows.main;
    cb(updatedWindows);
  } else {
    cb({ ...prev, main: {} });
  }
};

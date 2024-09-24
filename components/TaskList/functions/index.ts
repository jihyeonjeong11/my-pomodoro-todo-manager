export const toggleMainTaskWindow = (
  isToggled: boolean,
  prev: any,
  cb: any,
) => {
  if (isToggled) {
    const updatedWindows = { ...prev };
    delete updatedWindows.main;
    cb(updatedWindows);
  } else {
    cb({ ...prev, main: {} });
  }
};

// post, put, delete
export const handleTasks = () => {};

// after action
export const handleActiveTask = () => {};

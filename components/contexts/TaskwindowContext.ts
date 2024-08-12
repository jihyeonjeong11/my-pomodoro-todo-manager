import createFastContext from 'components/contexts/createFastContext';

export const {
  FastContextProvider: TaskWindowsProvider,
  useFastContextFields: useTaskWindows,
} = createFastContext({
  taskWindows: {},
});

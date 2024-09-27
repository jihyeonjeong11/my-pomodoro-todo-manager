import createFastContext from "components/contexts/createFastContext";

export const {
  FastContextProvider: IndexedDBProvider,
  useFastContextFields: useIndexedDB,
} = createFastContext({
  status: "not connected",
});

import React, {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

export default function createFastContext<T>(initialState: T) {
  function useFastContextData(): {
    get: () => T;
    set: (value: Partial<T>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef<T>(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<T>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseFastContextDataReturnType = ReturnType<typeof useFastContextData>;

  const Context = createContext<UseFastContextDataReturnType | null>(null);

  function FastContextProvider({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <Context.Provider value={useFastContextData()}>
        {children}
      </Context.Provider>
    );
  }

  function useFastContext<SelectorOutput>(
    selector: (store: T) => SelectorOutput
  ): [SelectorOutput, (value: Partial<T>) => void] {
    const fastContext = useContext(Context);
    if (!fastContext) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
      fastContext.subscribe,
      () => selector(fastContext.get()),
      () => selector(initialState)
    );

    return [state, fastContext.set];
  }

  function useFastContextFields<SelectorOutput>(fieldNames: string[]): {
    [key: string]: { get: SelectorOutput; set: (value: any) => void };
  } {
    const gettersAndSetters: {
      [key: string]: { get: SelectorOutput; set: (value: any) => void };
    } = {};
    for (const fieldName of fieldNames) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [getter, setter] = useFastContext(
        (fc) => (fc as Record<string, SelectorOutput>)[fieldName]
      );
      gettersAndSetters[fieldName] = {
        get: getter,
        set: (value: any) => setter({ [fieldName]: value } as Partial<T>),
      };
    }

    return gettersAndSetters;
  }

  return {
    FastContextProvider,
    useFastContextFields,
  };
}

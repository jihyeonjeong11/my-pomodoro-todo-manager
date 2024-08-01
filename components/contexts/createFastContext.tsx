import type React from "react";
import {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

type UseContextType<T> = {
  [K in keyof T]: {
    get: T[K];
    set: (value: T[K]) => void;
  };
};

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
    selector: (store: T) => SelectorOutput,
  ): [SelectorOutput, (value: Partial<T>) => void] {
    const fastContext = useContext(Context);
    if (!fastContext) {
      throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
      fastContext.subscribe,
      () => selector(fastContext.get()),
      () => selector(initialState),
    );

    return [state, fastContext.set];
  }

  function useFastContextFields(fieldNames: (keyof T)[]): UseContextType<T> {
    const gettersAndSetters: UseContextType<T> = {} as UseContextType<T>;

    for (const fieldName of fieldNames) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [getter, setter] = useFastContext((fc) => fc[fieldName]);

      gettersAndSetters[fieldName] = {
        get: getter,
        set: (value) => setter({ [fieldName]: value } as unknown as Partial<T>),
      };
    }

    return gettersAndSetters;
  }

  return {
    FastContextProvider,
    useFastContextFields,
  };
}

// The issue you are encountering is due to the fact that the useFastContext hook is being called inside a loop in your useFastContextFields function. React hooks need to be called in a consistent order every time a component renders. When you call hooks inside a loop, the order of these calls can change, which breaks the rules of hooks.

// To fix this, you need to ensure that hooks are called in a predictable order. One approach is to use useMemo to create the object with getter and setter functions, ensuring that the hook calls are stable.

// Here's the revised useFastContextFields function to ensure hooks are called in the correct order:

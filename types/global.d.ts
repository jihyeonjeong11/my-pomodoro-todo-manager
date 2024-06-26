import React, { MutableRefObject } from "react";

declare module "react" {
  type FC<TProps = Record<string, unknown>> = (
    props: React.PropsWithChildren<TProps>,
  ) => React.JSX.Element | null;
}

// FastContext
export interface FastContext<Value> {
  /**
   * The native context type used internally.
   *
   * @private
   */
  baseContext: React.Context<MutableRefObject<Value>>;

  /**
   * Provider component for the context.
   */
  Provider: (props: {
    value: Value;
    children: React.ReactNode;
  }) => React.ReactElement;
}

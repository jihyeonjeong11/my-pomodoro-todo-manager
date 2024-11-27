import { type MutableRefObject } from "react";
import type React from "react";

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

// Can be expanded
export type TaskWindowType = Record<"main" | string, { actionType: string }>;

export type Sizes = {
  timer: {
    defaultCircleOffset: number;
  };
  pcWindow: {
    width: number;
    height: number;
  };
  taskForm: {
    taskFormHeight: number;
    taskFormPadding: number;
  };
};

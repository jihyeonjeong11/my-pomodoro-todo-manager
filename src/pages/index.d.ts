import React from "react";

/**
 * Functional Component
 */

declare module "react" {
  type FC<TProps = Record<string, unknown>> = (
    props: React.PropsWithChildren<TProps>
  ) => React.JSX.Element | null;
}

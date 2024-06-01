/**
 * Functional Component
 */

type FC<TProps = Record<string, unknown>> = (
  props: PropsWithChildren<TProps>
) => JSX.Element | null;

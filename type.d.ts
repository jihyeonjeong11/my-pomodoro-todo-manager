type FC<TProps = Record<string, unknown>> = (
  props: React.PropsWithChildren<TProps>,
) => React.JSX.Element | null;

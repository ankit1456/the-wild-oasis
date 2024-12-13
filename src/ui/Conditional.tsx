import { PropsWithChildren, ReactNode } from "react";

type Props = { test: unknown; fallback?: ReactNode };
function Conditional({
  test,
  fallback = null,
  children,
}: PropsWithChildren<Props>) {
  return test ? children : fallback;
}

export default Conditional;

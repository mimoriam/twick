import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex h-full items-center justify-center">{children}</div>;
};

export default AuthLayout;

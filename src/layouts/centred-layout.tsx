import { type FC, type ReactNode } from "react";

const CentredLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex grow flex-col items-center justify-center relative min-h-screen">
      {children}
    </div>
  );
};

export { CentredLayout };

import { type ReactNode } from "react";

interface ViewPortProps {
  children: ReactNode;
}

export function ViewPort({ children }: ViewPortProps): React.ReactElement {
  return (
    <div className="bg-base-200 border-base-300 box-border flex h-full w-full items-center justify-center overflow-y-auto rounded-2xl border-8">
      {children}
    </div>
  );
}

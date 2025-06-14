import React, { type ReactNode } from "react";

interface ViewPortProps {
  children: ReactNode;
}

/**
 * ViewPort component that provides a consistent layout wrapper for main content areas
 * @param {ViewPortProps} props - Component props
 * @param {ReactNode} props.children - Child components to be rendered within the viewport
 * @returns {React.ReactElement} A wrapped viewport container
 */
export function ViewPort({ children }: ViewPortProps): React.ReactElement {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 w-full border-4 rounded-xl border-base-300">
      {children}
    </div>
  );
}

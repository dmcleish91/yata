import { type ReactNode } from 'react';

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
  return <div className='flex items-center bg-base-300 w-full h-full border-8 border-base-300 box-border overflow-hidden'>{children}</div>;
}

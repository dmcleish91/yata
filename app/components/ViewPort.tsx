import { type ReactNode } from 'react';

interface ViewPortProps {
  children: ReactNode;
}

export function ViewPort({ children }: ViewPortProps): React.ReactElement {
  return (
    <div className='flex items-center bg-base-200 w-full h-full border-8 border-base-300 rounded-2xl box-border overflow-hidden pl-2'>
      {children}
    </div>
  );
}

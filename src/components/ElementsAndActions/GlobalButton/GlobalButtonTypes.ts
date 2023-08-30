import { ReactNode } from 'react';

export interface IGlobalButtonProps {
  buttonAction?: (() => void) | undefined;
  buttonType?: 'color' | 'opacity';
  isDisabled?: boolean;
  children: ReactNode;
}

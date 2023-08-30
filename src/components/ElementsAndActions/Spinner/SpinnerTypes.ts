export type TSpinnerColor = 'blue' | 'white';

export interface ISpinnerProps {
  size?: number;
  isCover?: boolean;
  isFixed?: boolean;
  isOverlayWhite?: boolean;
  color?: TSpinnerColor;
}

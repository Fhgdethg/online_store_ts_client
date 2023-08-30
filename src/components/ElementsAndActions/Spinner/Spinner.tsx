import React from 'react';
import cN from 'classnames';

import SCSpinner from './SCSpinner';

import { ISpinnerProps } from './SpinnerTypes';

const Spinner: React.FC<ISpinnerProps> = ({
  size = 38,
  isCover = false,
  isFixed = false,
  isOverlayWhite = false,
  color = 'blue',
}) => {
  const classes = cN('spinner_overlay', {
    ['cover']: isCover,
    ['fixed']: isFixed,
    ['white']: isOverlayWhite,
  });

  return (
    <SCSpinner className={classes} color={color}>
      <div
        className='lds_ring'
        style={{
          width: size,
          height: size,
        }}
      >
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              style={{
                width: size,
                height: size,
                borderWidth: size / 10,
              }}
            />
          ))}
      </div>
    </SCSpinner>
  );
};

export default Spinner;

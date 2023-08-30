import styled from 'styled-components';

import { theme } from '../../../theme/theme';

import { TSpinnerColor } from './SpinnerTypes';

const { colors } = theme;

interface ISCSpinnerProps {
  color: TSpinnerColor;
}

const SCSpinner = styled.form<ISCSpinnerProps>`
  .spinner_overlay {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(1px);
    z-index: 110;

    &.cover {
      position: absolute;
    }

    &.fixed {
      position: fixed;
    }

    &.white {
      background-color: ${colors.white};
      border-radius: 10px;
    }
  }

  .lds_ring {
    display: block;
    position: relative;
  }
  .lds_ring div {
    position: absolute;
    display: block;
    border: solid;
    border-radius: 50%;
    animation: lds_ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${colors.blue} transparent transparent transparent;

    ${(props) =>
      (props.color === 'white' &&
        'border-color: white transparent transparent transparent;') ||
      ''}
  }
  .lds_ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds_ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds_ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds_ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default SCSpinner;

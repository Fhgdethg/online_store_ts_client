import styled, { css } from 'styled-components';

import { theme } from '../theme/theme';

const { colors } = theme;

const SCOutsideClickWrp = styled.div`
  position: fixed;
  z-index: 100;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background: ${colors.blackDarkOpacity};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default SCOutsideClickWrp;

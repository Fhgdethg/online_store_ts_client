import styled from 'styled-components';

import { theme } from '../theme/theme';

const { colors } = theme;

const SCWhiteWrapper = styled.div`
  background: ${colors.white};
  padding: 25px 33px;
  box-shadow: 3px 3px 3px ${colors.blackOpacity};
  border-radius: 27px;
  min-width: 360px;
  
  @media screen and (min-width: 560px) {
    & {
      min-width: 540px;
    }
  }
`;

export default SCWhiteWrapper;

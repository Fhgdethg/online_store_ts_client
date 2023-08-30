import styled from 'styled-components';

import SCWrapper from '../../ui/SCWrapper'

import { theme } from '../../theme/theme';

const { colors } = theme;

const SCHeader = styled.nav`
  width: 100%;
  padding: 10px 0 8px;
  background: ${colors.white};
  box-shadow: 0 0 10px ${colors.blackOpacity};

  ${SCWrapper} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo_wrp {
    display: flex;
    align-items: center;

    .label {
      font-size: 20px;
      color: ${colors.blue};
      font-weight: 700;
    }
  }

  .links_wrp {
    display: flex;
    gap: 27px;
    align-items: center;

    .nav_link {
      text-decoration: none;
      font-size: 20px;
      color: ${colors.blue};
      font-weight: 700;
    }

    .active_nav_link {
      color: ${colors.black};
    }
  }
`;

export default SCHeader;

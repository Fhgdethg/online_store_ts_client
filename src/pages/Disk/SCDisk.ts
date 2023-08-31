import styled from 'styled-components';

import { theme } from '../../theme/theme';

const { colors } = theme;

const SCDisk = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  
  .functional_buttons {
    margin-top: 40px;
    display: flex;
    gap: 10px;
  }
`;

export default SCDisk;

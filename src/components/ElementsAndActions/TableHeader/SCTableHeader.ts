import styled from 'styled-components';

import { theme } from '../../../theme/theme';

const { colors } = theme;

interface SCTableHeaderProps {
  grid_template: string;
}

const SCTableHeader = styled.div<SCTableHeaderProps>`
  display: grid;
  grid-template-columns: ${(props) => props.grid_template};
  align-items: center;
  border-bottom: 2px solid ${colors.blue};
  padding: 8px 0;
  grid-column-gap: 20px;
  margin-bottom: 5px;
`;

export default SCTableHeader;

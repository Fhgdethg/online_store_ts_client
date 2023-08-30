import styled from 'styled-components';

import { theme } from '../theme/theme';

const { colors } = theme;

interface SCTableRowProps {
  grid_template: string;
}

const SCTableRow = styled.div<SCTableRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.grid_template};
  align-items: center;
  border-bottom: 2px solid ${colors.blue};
  cursor: pointer;
  padding: 8px 0;
  grid-column-gap: 20px;

  &:hover {
    border-bottom-color: ${colors.darkBlue};
  }
`;

export default SCTableRow;

import styled from 'styled-components';

import SCTableRow from '../../../ui/SCTableRow';
import SCGlobalButton from '../../ElementsAndActions/GlobalButton/SCGlobalButton';

const SCFileStandardTable = styled.div`
  margin-top: 30px;
  max-height: calc(100vh - 220px);
  display: flex;
  flex-direction: column;

  .file_size_and_extended {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  p {
    min-width: 100px;
  }

  ${SCGlobalButton} {
    display: none;
  }

  ${SCTableRow}:hover {
    ${SCGlobalButton} {
      display: block;

      svg {
        width: 20px;
        height: 100%;
      }
    }
  }

  .spinner_wrp {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default SCFileStandardTable;

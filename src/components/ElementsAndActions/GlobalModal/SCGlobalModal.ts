import styled from 'styled-components';
import SCWhiteWrapper from '../../../ui/SCWhiteWrapper';

const SCGlobalModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${SCWhiteWrapper} {
    z-index: 101;
    //position: fixed;
    justify-self: center;
  }
`;

export default SCGlobalModal;

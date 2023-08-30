import React from 'react';
import styled from 'styled-components';

import Spinner from '../ElementsAndActions/Spinner/Spinner';

const SCSpinnerWrapper = styled.div`
  width: 100%;
  margin-top: 200px;
  display: flex;
  justify-content: center;
`;

const ElementWrapper: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  return (
    <React.Suspense
      fallback={
        <SCSpinnerWrapper>
          <Spinner />
        </SCSpinnerWrapper>
      }
    >
      {element}
    </React.Suspense>
  );
};

export default ElementWrapper;

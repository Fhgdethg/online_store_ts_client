import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router';

import Header from '../Header/Header';
import GlobalModal from '../ElementsAndActions/GlobalModal/GlobalModal';

import SCWrapper from '../../ui/SCWrapper';
import SCGlobalModal from '../ElementsAndActions/GlobalModal/SCGlobalModal';

import { theme } from '../../theme/theme';

const { colors } = theme;

const SCLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;

  main {
    background: ${colors.lightGreyBg};
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  main > ${SCWrapper} {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  ${SCGlobalModal} {
    position: fixed;
  }
`;

const Layout = () => {
  return (
    <SCLayout>
      <GlobalModal />
      <Header />
      <main className='main'>
        <SCWrapper horizontalPadding={12}>
          <Outlet />
        </SCWrapper>
      </main>
    </SCLayout>
  );
};

export default Layout;

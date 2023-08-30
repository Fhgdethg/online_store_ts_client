import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';

import ElementWrapper from '../ElementWrapper/ElementWrapper';
import Layout from '../Layout/Layout';
const Registration = React.lazy(
  () => import('../../pages/Registration/Registration'),
);
const Login = React.lazy(() => import('../../pages/Login/Login'));
const Disk = React.lazy(() => import('../../pages/Disk/Disk'));

import { useAppSelector } from '../../redux/hooks';

import { getStoreAuthData } from '../../redux/auth/authSelectors';
import { useAuthQuery } from '../../redux/api/authApi';

import { routes } from '../../routes/routes';

const App = () => {
  const navigate = useNavigate();
  useAuthQuery();

  const { isAuth } = useAppSelector(getStoreAuthData);

  useEffect(() => {
    if (!isAuth) navigate(routes.login);
  }, [isAuth]);

  return (
    <ElementWrapper
      element={
        <Routes>
          <Route element={<Layout />}>
            {isAuth ? (
              <>
                <Route
                  path={routes.root}
                  element={<ElementWrapper element={<Disk />} />}
                />
              </>
            ) : (
              <>
                <Route
                  path={routes.registration}
                  element={<ElementWrapper element={<Registration />} />}
                />
                <Route
                  path={routes.login}
                  element={<ElementWrapper element={<Login />} />}
                />
              </>
            )}
            <Route
              path={routes.error}
              element={<ElementWrapper element={<div>Error</div>} />}
            />
          </Route>
        </Routes>
      }
    />
  );
};

export default App;

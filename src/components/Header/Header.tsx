import React from 'react';

import { ReactComponent as Disk } from '../../assets/disk.svg';
import { NavLink } from 'react-router-dom';
import SCWrapper from '../../ui/SCWrapper';
import SCHeader from './SCHeader';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { getStoreAuthData } from '../../redux/auth/authSelectors';
import { changeAuth } from '../../redux/auth/authSlice';

import { routes } from '../../routes/routes';
import { lSKeys } from '../../constants/lSKeys';

interface INavItem {
  clickHandler?: () => void | undefined;
  isShow: boolean;
  text: string;
  path: string;
}

const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(getStoreAuthData);

  const logout = () => {
    localStorage.removeItem(lSKeys.t);
    dispatch(changeAuth());
  };

  const navItems = [
    {
      text: 'Войти',
      path: routes.login,
      isShow: !isAuth,
    },
    {
      text: 'Регистрация',
      path: routes.registration,
      isShow: !isAuth,
    },
    {
      text: 'Выйти',
      path: routes.login,
      isShow: isAuth,
      clickHandler: logout,
    },
  ];

  return (
    <SCHeader>
      <SCWrapper maxSize={1900} horizontalPadding={10} className='content_wrp'>
        <div className='logo_wrp'>
          <Disk />
          <p className='label'>MERN CLOUD</p>
        </div>
        <nav className='links_wrp'>
          {navItems.map(
            (item: INavItem) =>
              item.isShow && (
                <NavLink
                  key={item.text}
                  to={item.path}
                  className={({ isActive }: any) =>
                    isActive ? 'nav_link active_nav_link' : 'nav_link'
                  }
                  onClick={item?.clickHandler}
                >
                  {item.text}
                </NavLink>
              ),
          )}
        </nav>
      </SCWrapper>
    </SCHeader>
  );
};

export default Header;

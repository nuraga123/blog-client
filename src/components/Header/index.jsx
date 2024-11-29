import React, { useState } from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../../hook/useTranslation.js';
import AzencoLogo from '../AzencoLogo/AzencoLogo.jsx';
import LanguageSwitcher from '../LanguageSwitcher/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout } from '../../redux/slices/auth.js';

export const Header = () => {
  const { data } = useSelector((state) => state.auth);
  const username = data || '';
  const [openUser, setOpenUser] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const isLogin = pathname === '/' || pathname === '/login';
  const isRegister = location.pathname === '/register';

  const handleLogout = () => {
    if (window.confirm(translate('logout_confirm'))) {
      dispatch(logout());
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          {isAuth ? (
            <Link to="/">
              <AzencoLogo />
            </Link>
          ) : (
            <AzencoLogo />
          )}

          <div className={styles.buttons}>
            {!isAuth && isRegister && (
              <Link to="login">
                <Button
                  variant="contained"
                  color="success"
                  className={styles.btn}
                >
                  {translate('login')}
                </Button>
              </Link>
            )}

            {!isAuth && isLogin && (
              <Link to="register">
                <Button variant="contained" color="info" className={styles.btn}>
                  {translate('register')}
                </Button>
              </Link>
            )}

            {isAuth && (
              <div className={styles.userMenu}>
                <img
                  onClick={() => setOpenUser(!openUser)}
                  onMouseEnter={() => setOpenUser(true)}
                  className={styles.avatar}
                  src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  alt="avatar"
                />
                <div
                  className={`${styles.dropdownMenu} ${
                    openUser ? styles.open : ''
                  }`}
                >
                  <div className={styles.dropdownItem}>{username.username}</div>
                  <div className={styles.dropdownItem}>{username.email}</div>
                  <Button
                    variant="contained"
                    color="error"
                    className={styles.logoutButton}
                    onClick={handleLogout}
                  >
                    {translate('logout')}
                  </Button>
                </div>
              </div>
            )}

            <div className={styles.btn}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

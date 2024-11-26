import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import AzencoLogo from '../SvgCompomets/AzencoLogo';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.pathname);

  const isLogin = location.pathname === '/login' ? true : false;
  const isRegister = location.pathname === '/register' ? true : false;

  const handleLogout = () => {
    if (window.confirm('выйти ?')) {
      localStorage.removeItem('token');
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          {isAuth ? (
            <Link className={styles.logo} to="/">
              <div className={styles.welcome}>Azenco</div>
            </Link>
          ) : (
            <AzencoLogo />
          )}

          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleLogout}
                >
                  выйти
                </Button>
              </>
            ) : (
              <>
                {!isLogin && (
                  <Link to={'login'}>
                    <Button variant="contained" color="success">
                      Войти
                    </Button>
                  </Link>
                )}

                {!isRegister && (
                  <Link to={'register'}>
                    <Button variant="contained" color="info">
                      Создать аккаунт
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

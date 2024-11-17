import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('выйти ?')) {
      localStorage.removeItem("token");
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ARCHAKOV BLOG</div>
          </Link>

          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to={'/add-post'}>
                  <Button variant="contained">написать статью</Button>
                </Link>

                <Button variant="contained" onClick={handleLogout}>
                  выйти
                </Button>
              </>
            ) : (
              <>
                <Link to={'login'}>
                  <Button variant="outlined">Войти</Button>
                </Link>

                <Link to={'register'}>
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

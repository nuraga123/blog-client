import React from 'react';
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../../hook/useTranslation'; // Обновленный импорт
import AzencoLogo from '../AzencoLogo/AzencoLogo';
import LanguageSwitcher from '../LanguageSwitcher';

export const Header = () => {
  const { translate } = useTranslation(); // Получаем функцию для перевода
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isLogin = pathname === '/' || pathname === '/login';
  const isRegister = location.pathname === '/register';

  const handleLogout = () => {
    if (window.confirm(translate('logout_confirm'))) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/">
            <AzencoLogo />
          </Link>

          <div className={styles.buttons}>
            <Button variant="contained" color="error" onClick={handleLogout}>
              {translate('logout')}
            </Button>

            {!isLogin && !isRegister && (
              <Link to={'login'}>
                <Button
                  variant="contained"
                  color="success"
                  className={styles.btn}
                >
                  {translate('login')}
                </Button>
              </Link>
            )}
            {!isRegister && (
              <Link to={'register'}>
                <Button variant="contained" color="info" className={styles.btn}>
                  {translate('register')}
                </Button>
              </Link>
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

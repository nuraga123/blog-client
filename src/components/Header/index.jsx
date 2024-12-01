import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { CloseRounded } from '@mui/icons-material';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../../hook/useTranslation.js';
import AzencoLogo from '../AzencoLogo/AzencoLogo.jsx';
import LanguageSwitcher from '../LanguageSwitcher/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout } from '../../redux/slices/auth.js';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export const Header = () => {
  const [openUser, setOpenUser] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data } = useSelector((state) => state.auth);
  const username = data || '';
  const isAuth = useSelector(selectIsAuth);
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const isLogin = pathname === '/' || pathname === '/login';
  const isRegister = location.pathname === '/register';

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
    setOpenModal(false);
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
                  size="small"
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
                <Button
                  size="small"
                  variant="contained"
                  color="info"
                  className={styles.btn}
                >
                  {translate('register')}
                </Button>
              </Link>
            )}

            {isAuth && (
              <div className={styles.userMenu}>
                {!openUser && (
                  <img
                    onClick={() => setOpenUser(!openUser)}
                    className={styles.avatar}
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    alt="avatar"
                  />
                )}
                <div
                  //onMouseLeave={() => setOpenUser(false)}
                  className={`${styles.dropdownMenu} ${
                    openUser ? styles.open : ''
                  }`}
                >
                  <div className={styles.btns}>
                    <div className={styles.dropdownItem}>
                      {username.username}
                    </div>
                    <Button
                      sx={{ minWidth: 10, padding: 0 }}
                      onClick={() => setOpenUser(!openUser)}
                      variant="contained"
                      color="error"
                    >
                      <CloseRounded size="small" />
                    </Button>
                  </div>
                  <div className={styles.dropdownItem}>{username.email}</div>
                  <div className={styles.btns}>
                    <Button
                      className={styles.logoutButton}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setOpenModal(true);
                        setOpenUser(false);
                      }}
                    >
                      {translate('logout')}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.btn}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </Container>

      {/* Модальное окно для подтверждения выхода */}
      <Dialog
        sx={{ alignItems: 'flex-start' }}
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          {translate('logout_confirm_title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            {translate('logout_confirm')}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button
            onClick={() => {
              setOpenModal(false);
              setOpenUser(false);
            }}
            color="primary"
            variant="outlined"
          >
            {translate('cancel')}
          </Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            {translate('logout')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

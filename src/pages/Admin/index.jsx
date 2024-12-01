import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../axios';
import styles from './Admin.module.scss';
import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { useNavigate } from 'react-router-dom';
import CreateResetPasswordForm from './CreateResetPasswordForm';

function Admin() {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [secret, setSecret] = useState('');
  const [email, setEmail] = useState('');
  const [openMethod, setOpenMethod] = useState(false);

  const checkAdmin = async ({ secret, email }) => {
    try {
      const { data } = await api.post('check-admin', {
        secret,
        email,
      });

      const dataMessage = data?.message === 'admin';

      if (dataMessage) {
        setIsAdmin(true);
        toast.success(data.message);
      } else {
        toast.error(`Доступ запрещен! ${data.message}`);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 'Ошибка сервера';
        toast.error(errorMessage);
      }
      console.log(error);
    }
  };

  if (isAuth) {
    if (isAdmin) {
      return (
        <div className={styles.adminContainer}>
          <h1 className={styles.adminWelcome}>
            Добро пожаловать, администратор!
          </h1>
          <div className={styles.adminConsole}>
            <p onClick={() => setOpenMethod(!openMethod)}>
              метод cоздания токена для сброса пароля
            </p>

            {openMethod && <CreateResetPasswordForm />}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.adminContainer}>
          <h1 className={styles.adminTitle}>Введите секретный ключ и почту</h1>
          <input
            type="password"
            placeholder="Введите секретный ключ"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className={styles.hackerInput}
          />

          <input
            type="email"
            placeholder="Введите почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.hackerInput}
          />

          <button
            onClick={() => checkAdmin({ secret, email })}
            className={styles.hackerButton}
            disabled={!secret || !email}
          >
            Проверить
          </button>
        </div>
      );
    }
  } else {
    return (
      <Button
        className={styles.hackerButton}
        onClick={() => navigate('/login')}
      >
        Доступ запрещен! Войдите в систему.
      </Button>
    );
  }
}

export default Admin;

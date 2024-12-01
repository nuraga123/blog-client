import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import styles from './ResetPassword.module.scss';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [resetPasswordToken, setResetPasswordToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (
      !email ||
      !username ||
      !resetPasswordToken ||
      !newPassword ||
      !confirmPassword
    ) {
      setError('Все поля обязательны');
      return;
    }

    // Проверка на совпадение паролей
    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await api.post('/update-password', {
        email,
        username,
        resetPasswordToken,
        newPassword,
        confirmPassword,
      });

      if (response.data.message === 'Пароль успешно обновлен') {
        toast.success(response.data.message);
        navigate('/login'); // Перенаправление на страницу входа
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка сервера');
    }
  };

  return (
    <div className={styles.resetPasswordForm}>
      <Button
        sx={{
          padding: 1,
          width: 40,
          margin: '10px 0',
          fontSize: 16,
        }}
        onClick={() => navigate('/')}
        variant="contained"
        color="secondary"
        fullWidth
      >
        <ArrowBackIcon />
      </Button>
      <h2>Обновить пароль</h2>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Введите ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="username">Имя пользователя</label>
        <input
          id="username"
          type="text"
          placeholder="Введите ваше имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="resetPasswordToken">Токен сброса пароля</label>
        <input
          id="resetPasswordToken"
          type="text"
          placeholder="Введите токен"
          value={resetPasswordToken}
          onChange={(e) => setResetPasswordToken(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="newPassword">Новый пароль</label>
        <input
          id="newPassword"
          type="password"
          placeholder="Введите новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Подтверждение пароля</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Подтвердите новый пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <button className={styles.hackerButton} onClick={handleSubmit}>
        Обновить пароль
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../axios';
import styles from './ResetPassword.module.scss';
import { useTranslation } from '../../hook/useTranslation';

export const ResetPassword = () => {
  const { translate } = useTranslation();
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
      setError(translate('invalid_password'));
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
      <h2>{translate('reset_password')}</h2>
      <div className={styles.formGroup}>
        <label htmlFor="email">{translate('email')}</label>
        <input
          id="email"
          type="email"
          placeholder={translate('email_required')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="username">{translate('username')}</label>
        <input
          id="username"
          type="text"
          placeholder={translate('username_invalid')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="resetPasswordToken">{translate('token')}</label>
        <input
          id="resetPasswordToken"
          type="text"
          placeholder={translate('token')}
          value={resetPasswordToken}
          onChange={(e) => setResetPasswordToken(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="newPassword">{translate('new_password')}</label>
        <input
          id="newPassword"
          type="password"
          placeholder={translate('new_password_required')}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">{translate('password_сonfirm')}</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder={translate('password_сonfirm')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <button className={styles.hackerButton} onClick={handleSubmit}>
        {translate('update_password')}
      </button>
    </div>
  );
};

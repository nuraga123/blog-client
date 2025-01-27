import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../axios';
import styles from './Admin.module.scss';

function CreateResetPasswordForm({ close }) {
  const [email, setEmail] = useState('');
  const [messageToken, setMessageToken] = useState('');
  const [secret, setSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateToken = async () => {
    try {
      setIsLoading(true);

      // Отправка данных на сервер
      const { data } = await api.post('/add-reset-password', { email, secret });

      if (data) {
        // Успешный ответ
        toast.success(data.message);
        setMessageToken(data.message);
        setEmail('');
        setSecret('');
      }
    } catch (error) {
      // Обработка ошибок
      const errorMessage =
        error.response?.data?.message || 'Ошибка сервера. Попробуйте позже.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.resetPasswordForm}>
      <div className={styles.titles}>
        <h3>Создание токена для сброса пароля</h3>
      </div>
      <div className={styles.formGroup}>
        <label>Электронная почта:</label>
        <input
          type="email"
          placeholder="Введите почту"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.hackerInput}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Секретный ключ:</label>
        <input
          type="password"
          placeholder="Введите секретный ключ"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className={styles.hackerInput}
        />
      </div>

      <button
        onClick={handleCreateToken}
        className={styles.hackerButton}
        disabled={!email || !secret || isLoading}
      >
        {isLoading ? 'Загрузка...' : 'Создать токен'}
      </button>

      <h1>{messageToken && `Ваш токен для сброса пароля: ${messageToken}`}</h1>
    </div>
  );
}

export default CreateResetPasswordForm;

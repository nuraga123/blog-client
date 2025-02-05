import React from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  const handleBack = () => navigate('/');
  
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.notFoundContainer__title}>4 0 4</h1>
      <p className={styles.notFoundContainer__text}>Страница не найдена</p>
      <button className={styles.notFoundContainer__button} onClick={handleBack}>
        Вернитесь назад
      </button>
    </div>
  );
}


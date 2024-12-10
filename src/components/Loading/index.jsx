import React from 'react';
import styles from './Loading.module.scss';
import { useTranslation } from '../../hook/useTranslation';

export const Loading = () => {
  const { translate } = useTranslation();

  return (
    <div className={styles.loadingPage}>
      <div className={styles.spinnerContainer}>
        <h1 className={styles.loadingText}>{translate('loading')}...</h1>
        <div className={styles.spinner} />
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useTranslation } from '../../hook/useTranslation';
import styles from './LanguageSwitcher.module.scss';

const LanguageSwitcher = () => {
  const { changeLanguage } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('lang') || 'az'
  );

  // Функция для переключения языка
  const handleLanguageChange = (lang) => {
    localStorage.setItem('lang', lang);
    setCurrentLanguage(lang);
    changeLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={styles.btn}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {currentLanguage === 'az'
          ? 'az'
          : currentLanguage === 'ru'
            ? 'ru'
            : 'en'}
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <button
            className={styles.dropdownItem}
            onClick={() => handleLanguageChange('az')}
          >
            az
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleLanguageChange('ru')}
          >
            ru
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleLanguageChange('en')}
          >
            en
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

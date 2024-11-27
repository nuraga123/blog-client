import React, { useState } from 'react';
import { useTranslation } from '../../hook/useTranslation'; // Обновленный импорт
import styles from './LanguageSwitcher.module.scss'; // Импорт стилей

const LanguageSwitcher = () => {
  const { changeLanguage } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Состояние для открытия/закрытия списка
  const [currentLanguage, setCurrentLanguage] = useState('az'); // Состояние для текущего языка

  // Функция для переключения языка
  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang); // Обновляем состояние
    changeLanguage(lang); // Меняем язык с помощью хука
    setIsDropdownOpen(false); // Закрываем список после выбора
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={styles.btn}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Открыть/закрыть выпадающий список
      >
        {currentLanguage === 'az'
          ? 'Az'
          : currentLanguage === 'ru'
            ? 'Ru'
            : 'En'}
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <button
            className={styles.dropdownItem}
            onClick={() => handleLanguageChange('az')}
          >
            Az
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleLanguageChange('ru')}
          >
            Ru
          </button>
          <button
            className={styles.dropdownItem}
            onClick={() => handleLanguageChange('en')}
          >
            En
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

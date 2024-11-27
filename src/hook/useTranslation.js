import React, { createContext, useContext, useState } from 'react';
import { translations } from '../translations/index.ts'

// Контекст для языка
const LanguageContext = createContext();

// Провайдер контекста
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('az');

  const translate = (key) => {
    return translations[language][key];
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ translate, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для доступа к контексту
export const useTranslation = () => {
  return useContext(LanguageContext);
};

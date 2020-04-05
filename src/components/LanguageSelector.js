
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div>
      <div className="form-check form-check-inline" onChange={changeLanguage}>
        <input className="form-check-input" type="radio" value="en" name="language" id="language-en" defaultChecked />
        <label className="form-check-label" htmlFor="language-en" title={t('english')}>
          {t('english')}
        </label>
      </div>
      <div className="form-check form-check-inline" onChange={changeLanguage}>
        <input className="form-check-input" type="radio" value="de" name="language" id="language-de" />
        <label className="form-check-label" htmlFor="language-de" title={t('german')}>
          {t('german')}
        </label>
      </div>
    </div>
  );
}

export default LanguageSelector;

import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

let en_chk = false;
let de_chk = false;

if(i18next.options.lng.substring(0,2)=="de"){
  de_chk = true;
  en_chk = false;
} else {
  de_chk = false;
  en_chk = true;
}

const LanguageSelector = () => {
   
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);

  };

  return (
    <div>
      <div className="form-check form-check-inline" onChange={changeLanguage}>
        <input className="form-check-input" type="radio" value="en" name="language" id="language-en" defaultChecked={en_chk} />
        <label className="form-check-label" htmlFor="language-en" title={t('english')}>
          {t('english')}
        </label>
      </div>
      <div className="form-check form-check-inline" onChange={changeLanguage}>
        <input className="form-check-input" type="radio" value="de" name="language" id="language-de" defaultChecked={de_chk}/>
        <label className="form-check-label" htmlFor="language-de" title={t('german')}>
          {t('german')}
        </label>
      </div>
    </div>
  );
}

export default LanguageSelector;
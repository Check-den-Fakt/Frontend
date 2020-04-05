import React from 'react';
import { useTranslation, getI18n } from 'react-i18next';

export default function Imprint() {
    const { t } = useTranslation();
  // Declare a new state variable, which we'll call "count"
  return (
    <div>
        <h1>{t('imprint')}</h1>

        <h2>{t('tmg')}</h2>
        <p>{t('checkTheFact')}<br />
            Kammergasse 9<br />
            85354 Freising</p>

        <p><strong>{t('represented')}</strong><br />
            Antonella Lorenz</p>

        <h2>{t('contact')}</h2>
        <p>{t('telephone')} <br />
            E-Mail: welcome@check-den-fakt.de</p>

        {/**<h2>EU-Streitschlichtung</h2>
        <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

        <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>**/}

        <h3>{t('content')}</h3>
        <p>{t('contentText')}</p>
        <h3>{t('link')}</h3>
        <p>{t('linkText')}</p>

        <h3>{t('copyright')}</h3>
        <p>{t('copyrightText')}</p>
        <p>{t('source')}</p>
    </div>
  );
}

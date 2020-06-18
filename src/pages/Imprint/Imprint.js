import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Imprint() {
  const { t } = useTranslation();

  // Declare a new state variable, which we'll call "count"
  return (
    <div className="mt-5">
        <h1>{t("imprint")}</h1>

        <h2>{t("InformationInAcc")} 5 TMG</h2>
        <p> IDEENbuero UG (haftungsbeschränkt)<br />
        Karolingerring 25<br />
        50678 Köln</p>

        <p><strong>{t("management")} </strong><br />
        Maika Paetzold</p>

        <h2>{t("contact")}</h2>
        <p>{t("phone")} +49 221 - 204 750 70<br />
            E-Mail: faktencheck@ideenbuero.org<br />
            Instagramm, Facebook, Twitter: @checkdenfakt<br/>
            </p>


        {/**<h2>EU-Streitschlichtung</h2>
        <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

        <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>**/}

        <h3>{t('content')}</h3>
        <p>{t('contentText')}</p>
        <h3>{t('link')}</h3>
        <p>{t('linkText')}</p>

        <p>{t("Source")}<a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer">eRecht24</a></p>

    </div>
  );
}

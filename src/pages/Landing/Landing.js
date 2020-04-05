import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import fetchAPI from '../../utils/fetchAPI';
import Carousel from 'react-bootstrap/Carousel';
import partnerLogos from './partner_img.json';
import { useTranslation, getI18n } from 'react-i18next';

export default function Landing() {
  const { t } = useTranslation();
  const isMobile = window.innerWidth <= 768;
  const [index, setIndex] = useState(0);
  const [news, setNews] = useState([]);
  const i18n = getI18n();
  const imgSrc = "img/logo-" + i18n.language + ".png";
  let mobileImages = null;
  let addText = null;
  
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetchAPI.postData('https://we-checkdenfakt-apimgm.azure-api.net/we-komnews-fa/GetNews', {
        query : "corona"
      });
      setNews(response.news.value);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state
  
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  if (i18n.language === "en") {
    addText = <span><br/><br/><strong>
      {t('checkTheFact')}</strong>
      {t('helpsYouToValidate')}</span>;
  }

  if (isMobile) {
    mobileImages = <div className="text-center pt-5">
      <Carousel activeIndex={index} onSelect={handleSelect}>
      {partnerLogos.map(({ src, alt }, id) => 
      <Carousel.Item key={id}>
         <div className="img-container">
          <img
            className="carousel-img"
            src={src}
            alt={alt}
            title={alt}
            key={id}
          />
          </div>
      </Carousel.Item>
      )}
      </Carousel>
    </div>
  } else {
    mobileImages = <div className="text-center">
      <div className="w-100">
      {partnerLogos.map(({ src, alt }) => 
          <img className="logo-wall"
            src={src}
            alt={alt}
            title={alt}
          />
      )}
            </div>
      </div>
  }

  return (
    <div className="container">
        <div className="d-flex justify-content-around mb-5">
          <img src={imgSrc} width="200" 
          alt={t('checkTheFact')}
          title={t('checkTheFact')} />
        </div>
        <h1 className="text-center">
            {t('findAndRefute')}
            <nobr>
              {t('coronaFakeNews')}
            </nobr>
        </h1>
        <p className="text-center">
          {t('introText')}
          {addText}
        </p>
        <div className="center">
          <div className="row">
            <div className="col-sm m-2">
            <Button href="/check" variant="primary" block className="py-3">
              <b>{t('checkMessage')}</b>
            </Button>
            </div>
            <div className="col-sm m-2">
            <Button href="/report" variant="secondary" block className="py-3">
              <b>{t('reportFakeMessage')}</b>
            </Button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="polygon background-color-1">
            <div className="container p-5">
              <h2>{t('whatsThisAllAbout')}</h2>
              <p>
                {t('checkTheFact')} {t('isAPlatform')}
              </p>
              <p>
                {t('trueToTheMotto')}
              </p>
            </div>
          </div>
        </div>
        <h1>{t('howToEvaluate')}</h1>
        <div className="row mt-5 pt-3">
          <div className="col-3">
            <span className="material-icons circle-icon">
              backup
            </span>
          </div>
          <div className="col-9">
            <h3>1. Nachricht hochladen</h3>
            Gib deine Nachricht bei Check den Fakt ein. Folgende Möglichkeiten hast du:
            <ul className="purple">
              <li>Links</li>
              <li>Freitexteingabe</li>
              <li>Social Messenger Nachrichten</li>
              <li>Tweets</li>
            </ul>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-3">
            <span className="material-icons circle-icon">
              thumb_up_alt
          </span>
          </div>
          <div className="col-9">
            <h3>2. Ergebnis erhalten</h3>
            Nach dem Hochladen erhältst du die Auswertung, mit folgenden Möglichkeit:
            <ul className="purple">
              <li>Grün: Glaubwürdig. Teilen erwünscht!</li>
              <li>Gelb: Zweifelhaft! Hinweise beachten!</li>
              <li>Rot: Unglaubwürdig. Nicht weitergeben! Klarstellen!</li>
              <li>Grau: Nicht auswertbar. Hinweise beachten!</li>
            </ul>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-3">
            <span className="material-icons circle-icon">
              share
          </span>
          </div>
          <div className="col-9">
            <h3>3. Auswertung weiterleiten </h3>
            <p>Teile das Prüfergebnis mit deinen Kontakten, um sie zu informieren.
          </p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="polygon background-color-2">
            <div className="container">
                <h1>Trending News zu Corona</h1>
                <ol>
                  {news.map(({ name, url }, index) => 
                    <li key={index}>
                      <p>
                        <a className="purple" href={url} target="_blank" rel="noopener noreferrer">
                          {name}
                        </a>
                      </p>
                    </li>
                  )}
                </ol>
            </div>

          </div>
        </div>

       {mobileImages}


    </div>
  );
}
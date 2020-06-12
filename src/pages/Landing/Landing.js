import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import fetchAPI from '../../utils/fetchAPI';
import Carousel from 'react-bootstrap/Carousel';
import partnerLogos from './partner_img.json';
import { useTranslation, getI18n } from 'react-i18next';

export default function Landing() {
  const { t } = useTranslation();
  const i18n = getI18n();
  const isMobile = window.innerWidth <= 768;
  const [index, setIndex] = useState(0);
  const [news, setNews] = useState([]);

  let mobileImages = null;
  let addText = null;

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetchAPI.postData('https://apim-checkdenfakt-prod-we-001.azure-api.net/newssearch/GetNews', {
        query: "corona"
      });
      if (response.news) {
        setNews(response.news.value);
      }
      else {
        console.warn("Wrong response from NewsApi")
      }
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state


  //Logo selection
  let imgSrc = "img/logo-de.svg";
  const currentPath = window.location.href;
  if (currentPath.includes(".com")) {
    imgSrc = "img/logo-en.svg";
  }


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  if (i18n.language === "en") {
    addText = <span><br /><br /><strong>
      {t('checkTheFact')}</strong>
      {t('helpsYouToValidate')}</span>;
  }

  if (isMobile) {
    mobileImages = <div className="text-center pt-5">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {partnerLogos.map(({ src, alt }, id) =>
          <Carousel.Item key={id}>
            <div className="img-container">
              <img className="carousel-img"
                src={src}
                alt={alt}
                title={alt}
                key={id} />
            </div>
          </Carousel.Item>
        )}
      </Carousel>
    </div>
  } else {
    mobileImages =
      <div className="text-center">
        <div className="w-100">
          {partnerLogos.map(({ src, alt }, id) =>
            <img className="logo-wall"
              src={src}
              alt={alt}
              title={alt}
              key={id}
            />
          )}
        </div>
      </div>
  }

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-around mb-4">
        <img src={imgSrc} height="250"
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
          <h3>{t('1.uploadMessage')}</h3>
          {t('enterYourNewsMessage')}
          <ul className="purple">
            <li>{t('links')}</li>
            <li>{t('text')}</li>
            <li>{t('socialMediaMessages')}</li>
            <li>{t('tweets')}</li>
            <li>{t('documents')}</li>
            <li>{t('pictures')}</li>
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
          <h3>{t('2.obtainResult')}</h3>
          {t('afterUploadingYourMessage')}
          <ul className="purple no-bullets">
            <li>{t('green')}</li>
            <li>{t('yellow')}</li>
            <li>{t('red')}</li>
            <li>{t('grey')}</li>
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
          <h3>{t('3.shareTheResult')}</h3>
          <p>
            {t('shareTheResult')}
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="polygon background-color-2">
          <div className="container p-5">
            <h1>{t('trendingNews')}</h1>
            <ol>
              {news.map(({ name, url }, index) =>
                <li key={index}>
                  <p>
                    <a className="purple" href={url} target="_blank" rel="noopener noreferrer" title={name}>
                      {name}
                    </a>
                  </p>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
      <div className="my-3 text-center">
        <h2>{t('fundingPartners')}</h2>
        {mobileImages}
      </div>

    </div>
  );
}
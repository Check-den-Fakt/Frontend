import React from 'react';
import Iframe from 'react-iframe'
import './About.css'
import { useTranslation } from 'react-i18next';


export default function About() {
    
    const { t } = useTranslation();

  return (
      <div className="container my-5">
          <h1>{t("TheTeamIntroduces")}</h1>
            <p>{t("interdisciplinaryTeam")}</p>
          <Iframe 
            url="/teamMapSrc/web/index.htm"
            id="mapFrame"
            className="map-iframe"
          />
          <div className="pt-5 d-flex justify-content-center">
              <div className="polygon background-color-2">
                  <div className="container">
                      <h2>{t("OurMission")}</h2>
                      <p>
                          {t("weWantToGivePeople")}
                      </p>
                  </div>
              </div>
          </div>
    </div>
  );
}
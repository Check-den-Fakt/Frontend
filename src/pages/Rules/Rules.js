import React from 'react';
import { useTranslation, getI18n } from 'react-i18next';

export default function Rules() {
  const { t } = useTranslation();
    // Declare a new state variable, which we'll call "count"
  return (
    <div className="container mt-5">
        <h1>{t("Detect")}</h1>
        <p> {t("FakeNewsLooseTheir")} {t("TheFloodOf")}  <a href="https://www.infektionsschutz.de/cv/coronavirus.html" target="_blank" rel="noopener noreferrer">
  <u><i>{t("Coronavirus")}</i></u></a> {t("ConfusesAnd")}
        </p>
    <div className="d-flex justify-content-center">
        <div className="polygon background-color-1">
            <div className="container">
                        <h1>{t("TheseQuestions")}</h1>
                        <li className="py-2"> {t("AmIAskedTo")}</li>
                        <li className="py-2">{t("PersonalLevel")}</li>
                        <li className="py-2">{t("StoryFromAnotherCountry")}</li>
                        <li className="py-2">{t("Statistics")}</li>
                        <li className="py-2">{t("SimpleReasoning")}</li>
                        <li className="py-2">{t("ReferenceImages")}</li>
                        <li className="py-2">{t("ConspiracyTheory")}</li>
                        <li className="py-2">{t("Simplification")}</li>
                        <li className="py-2">{t("immunity")}</li>
            </div>
          </div>
        </div>
        <h1>{t("TheseAreThe")}</h1>
        <ol>
            <li>{t("DontShare")}</li>
            <li>{t("First")}</li>
            <li>{t("CheckWithApp")}</li>
        </ol>
    </div>
  );
}
import React from 'react';
import { NavLink } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import './Result.css';
import { ProgressBar, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// import ShareButtons from '../../components/ShareButtons';
// import ResultDetails from './ResultDetails';

export default function Result({verifable, overallScore, requestData }) {
  const trustScore = Math.round(overallScore * 100) / 100
  const { t } = useTranslation();

  //console.log("The result functions score",trustScore)
  // Declare a new state variable, which we'll call "count"
  let content = null;
  let bgClass = '';

  let foundationDate = new Date("March 20, 2020 24:00:00").getTime();
  let nowDate = new Date().getTime(); 
  var deltaT = nowDate - foundationDate;
  var deltaDays = Math.floor(deltaT / (1000 * 60 * 60 * 24));

  if (verifable) {
    if (trustScore > 0.70) {
      bgClass = 'bg-color-success';
      content = <Card className="cart-top-margin">
        <Card.Body className="shadow">
          <div class="container">
            <div class="row">
              <div class="col-sm-11">
                <Card.Title><b>{trustScore * 100}% glaubwürdig</b></Card.Title>
                <ProgressBar variant="success" now={trustScore * 100} class="inline" />
              </div>
              <div class="col-sm-1">
                <span className="material-icons success">
                    check_circle
                </span>
              </div>
            </div>
          </div>
          <Card.Text className="cart-top-margin">
          <b>check-den-fakt.de</b> {t("CheckCouldFind")}
          </Card.Text>
        </Card.Body>
      </Card>
    } 
    else if (trustScore > 0.35){
      bgClass = 'bg-color-warning';
      content = <Card>
      <Card.Body>
        <div class="container">
          <div class="row">
            <div class="col-sm-11">
    <Card.Title>{trustScore * 100}% {t("reputable")}</Card.Title>
              <ProgressBar variant="warning" now={trustScore * 100} />
            </div>
            <div class="col-sm-1">
            <span className="material-icons undef">
                live_help
            </span>
            </div>
          </div>
        </div>
        <Card.Text className="cart-top-margin">
          <b>check-den-fakt.de</b>{t("CheckIsNotSure")}
        </Card.Text>
      </Card.Body>
    </Card>
    }
    
    else {
      bgClass = 'bg-color-error';
      content = <Card>
      <Card.Body>
        <div class="container">
          <div class="row">
            <div class="col-sm-11">
              <Card.Title>{trustScore * 100}% {t("reputable")}</Card.Title>
              <ProgressBar variant="danger" now={trustScore * 100} />
            </div>
            <div class="col-sm-1">
              <span className="material-icons danger">
                  cancel
              </span>
            </div>
          </div>
        </div>
        <Card.Text className="cart-top-margin">
          <b>check-den-fakt.de</b> {t("CheckCouldNot")}
        </Card.Text>
      </Card.Body>
    </Card>
    }
  } else {
    bgClass = 'bg-color-warning';
    content = <Card>
    <Card.Body>
      <div>
        <div class="row">
          <div class="col-sm-11">
  <Card.Title>{t("notVerifiable")}</Card.Title>
            <ProgressBar variant="danger" now={0} />
          </div>
          <div class="col-sm-1">
            <span className="material-icons undef">
                live_help
            </span>
          </div>
        </div>
      </div>
      <Card.Text className="cart-top-margin">
  <p>{t("artificialIntelligence")}</p>
      <b>check-den-fakt.de</b> {t("CheckCouldNot")}
      </Card.Text>
    </Card.Body>
  </Card>
  }

  return (
    <div className="text-center">

    <Accordion className="">
      <Card>
        <Card.Header>
          <Accordion.Toggle as={NavLink}  eventKey="0">
  <b>{t("alpha")}</b>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          <p>{t("DidYouKnow")} <b>check-den-fakt.de</b> {t("IsOnly")} {deltaDays} {t("DaysOld")} </p> {t("RightNow")}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      </Accordion>
      
      
      <div className="d-flex justify-content-center">
          <div className={`polygon ${bgClass}`}>
            <div className="container">
            {content}
            {/*trustedPublisher && <ShareButtons />*/}
            </div>
          </div>
        </div>
      <div className="text-left">
  <p className="fact-header">{t("yourMessage")}</p>
        <Card className="your-message-card">
          <p>"{requestData && (requestData.text || requestData.url)}"</p>
        </Card>
      </div>
      <a className="fact-link pt-5" href="/about">Wer wir sind?</a>
    </div>
  );
}

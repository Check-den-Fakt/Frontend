import React from 'react';
import { NavLink } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import './Result.css';
import { ProgressBar, Card, Alert } from 'react-bootstrap';
import { Chart } from "react-google-charts";
import { useTranslation } from 'react-i18next';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

// import ShareButtons from '../../components/ShareButtons';

export default function Result({ verifable, overallScore, requestData, detailedResult }) {
  const trustScore = overallScore;
  const { t } = useTranslation();


  // Declare a new state variable, which we'll call "count"
  let content = null;
  let bgClass = '';

  const donutChartOptions = {
    pieHole: 0.6,
    is3D: false,
    pieSliceText: "none",
    legend: { position: 'bottom' },
  }

  let foundationDate = new Date("March 20, 2020 24:00:00").getTime();
  let nowDate = new Date().getTime();
  var deltaT = nowDate - foundationDate;
  var deltaDays = Math.floor(deltaT / (1000 * 60 * 60 * 24));

  if (verifable) {

    if (trustScore > 0.70) {
      bgClass = 'bg-color-success';
      content = <Card className="cart-top-margin">
        <Card.Body className="shadow">
          <div className="container">
            <div className="row">
              <div className="col-sm-11">
                <Card.Title><b>{(trustScore * 100.0).toFixed(2)}% glaubwürdig</b></Card.Title>
                <ProgressBar variant="success" now={trustScore * 100.0} className="inline" />
              </div>
              <div className="col-sm-1">
                <CheckCircleIcon className="material-icons success"/>
              </div>
            </div>
          </div>
          <Card.Text className="cart-top-margin">
            <b>check-den-fakt.de</b> {t("CheckCouldFind")}
          </Card.Text>
        </Card.Body>
      </Card>
    }
    else if (trustScore > 0.35) {
      bgClass = 'bg-color-warning';
      content = <Card>
        <Card.Body>
          <div className="container">
            <div className="row">
              <div className="col-sm-11">
                <Card.Title>{trustScore * 100}% {t("reputable")}</Card.Title>
                <ProgressBar variant="warning" now={trustScore * 100} />
              </div>
              <div className="col-sm-1">
                <LiveHelpIcon className="material-icons undef"/>
              </div>
            </div>
          </div>
          <Card.Text className="cart-top-margin">
            <b>check-den-fakt.de</b> {t("CheckIsNotSure")}
          </Card.Text>
        </Card.Body>
      </Card>
    }
    else {
      bgClass = 'bg-color-error';
      content = <Card>
        <Card.Body>
          <div className="container">
            <div className="row">
              <div className="col-sm-11">
                <Card.Title>{trustScore * 100}% {t("reputable")}</Card.Title>
                <ProgressBar variant="danger" now={trustScore * 100} />
              </div>
              <div className="col-sm-1">
                <CancelIcon className="material-icons danger"/>
              </div>
            </div>
          </div>
          <Card.Text className="cart-top-margin">
            <b>check-den-fakt.de</b> {t("CheckCouldNot")}
          </Card.Text>
        </Card.Body>
      </Card>
    }
  }

  // Not verifiable
  else {
    bgClass = 'bg-color-warning';
    content = <Card>
      <Card.Body>
        <div>
          <div className="row">
            <div className="col-sm-11">
              <Card.Title>{t("notVerifiable")}</Card.Title>
              <ProgressBar variant="danger" now={0} />
            </div>
            <div className="col-sm-1">
              <LiveHelpIcon className="material-icons undef"/>
            </div>
          </div>
        </div>
        <Card.Text className="cart-top-margin">
          <b>check-den-fakt.de</b> {t("CheckNotVerifiable")}
        </Card.Text>
      </Card.Body>
    </Card>
  }

  return (
    <div className="text-center">

      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={NavLink} eventKey="0">
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

      <div className="container">

        {/* Unsere Einschätzung */}
        <div className="mt-5">
          <h2 className="text-center my-3">Wie kommt unsere Einschätzung zustande</h2>

          <div className="d-flex justify-content-around flex-wrap">
            {/* Trusted PB */}
            {detailedResult.publisher["score"] ?
              <div className="m-3">
                <h3 className="my-2">CheckTheFact Quell-Beurteilung</h3>
                <Card className="result-card">
                  <Card.Body>
                    <Card.Title>{detailedResult.publisher["url"]}</Card.Title>

                    <Alert variant="dark">
                      {detailedResult.publisher["reason"]}
                    </Alert>

                    <Card.Subtitle className="mb-2 text-muted">Quell-Glaubwürdigkeit:</Card.Subtitle>
                    <Chart
                      chartType="PieChart"
                      width="100%"
                      height="150px"
                      data={[
                        ["Kategorie", "Anteil"],
                        ["Die Quelle ist seriös", detailedResult.publisher["score"]],
                        ["Die Quelle ist unseriös", (1.0 - detailedResult.publisher["score"])],
                      ]}
                      options={donutChartOptions}
                    />
                  </Card.Body>
                </Card>
              </div> :
              <div></div>}

            {/* FakeNews DB */}
            {detailedResult.dbMatch["amountVotes"] ?
              <div className="m-3">
                <h3 className="my-2">CheckTheFact Fake News Datenbank</h3>
                <Card style={{ width: '25rem' }}>
                  <Card.Body>
                    <Card.Title>Wir haben einen Datenbankeintrag gefunden, der zu {detailedResult.dbMatch["weight"].toFixed(4) * 100}% mit ihrem Beitrag übereinstimmt.</Card.Title>

                    <Alert variant="dark">
                      {detailedResult.dbMatch["text"]}
                    </Alert>

                    <Card.Subtitle className="mb-2 text-muted">Nutzer Abstimmung:</Card.Subtitle>
                    <Chart
                      chartType="PieChart"
                      width="100%"
                      height="150px"
                      data={[
                        ["Kategorie", "Anteil"],
                        ["Korrekt", detailedResult.dbMatch["proVotes"]],
                        ["Falsch", detailedResult.dbMatch["conVotes"]],
                      ]}
                      options={donutChartOptions}
                    />
                    <Card.Link href="/voting">Bist du anderer Meinung?</Card.Link>
                  </Card.Body>
                </Card>
              </div> :
              <div></div>}

            {/* ML Model */}
            {detailedResult.mlPrediction["score"] ?
              <div className="m-3">
                <h3 className="my-2">CheckTheFact AI</h3>
                <Card style={{ width: '25rem' }}>
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Künstliche Intelligenz Bewertung:</Card.Subtitle>
                    <Chart
                      chartType="PieChart"
                      width="100%"
                      height="150px"
                      data={[
                        ["Kategorie", "Anteil"],
                        ["Korrekt", (detailedResult.mlPrediction["score"])],
                        ["Falsch", (1.0 - detailedResult.mlPrediction["score"])],
                      ]}
                      options={donutChartOptions}
                    />
                  </Card.Body>
                </Card>
              </div> :
              <div></div>}

          </div>
        </div>
      </div>

      <a className="fact-link pt-5" href="/about">Wer wir sind?</a>
    </div>
  );
}

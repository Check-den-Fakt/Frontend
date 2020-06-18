import React from 'react';
import { Alert, Card } from 'react-bootstrap';
import { Chart } from "react-google-charts";



export default function Playground() {
    const detailedResult = {
    publisher: {},
    dbMatch: {},
    mlPrediction: {}
  }

  const donutChartOptions = {
    pieHole: 0.6,
    is3D: false,
    pieSliceText: "none",
    legend: { position: 'bottom' },
  }

  detailedResult.publisher["score"] = 0.95;
  detailedResult.publisher["reason"] = "Die ARD (Arbeitsgemeinschaft der öffentlich-rechtlichen Rundfunkanstalten der Bundesrepublik Deutschland) ist ein 1950 gegründeter Verbund öffentlich-rechtlicher Rundfunkanstalten in Deutschland, der über den Rundfunkbeitrag finanziert wird."
  detailedResult.publisher["url"] = "tagesschau.de";
  detailedResult.dbMatch["weight"] = 0.4;
  detailedResult.dbMatch["text"] = "Erntehelfer dürfen ab kommender Woche wieder ohne Beschränkungen nach Deutschland einreisen. Das Kabinett billigte nach Informationen von tagesschau.de ein Konzept von Ministerin Klöckner. Es gelten strenge Hygiene-Regeln."
  detailedResult.dbMatch["proVotes"] = 12;
  detailedResult.dbMatch["conVotes"] = 3;
  detailedResult.dbMatch["amountVotes"] = 15;
  detailedResult.mlPrediction["score"] = 0.03 ;

  return (
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
                  <Card.Text>
                  <Alert variant="dark">
                    {detailedResult.publisher["reason"]}
                    </Alert>
                  </Card.Text>
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
                  <Card.Title>Wir haben einen Datenbankeintrag gefunden, der zu {detailedResult.dbMatch["weight"] * 100}% mit ihrem Beitrag übereinstimmt.</Card.Title>
                  <Card.Text>
                  <Alert variant="dark">
                    {detailedResult.dbMatch["text"]}
                  </Alert>
                  </Card.Text>
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
                      ["Korrekt", (1.0 - detailedResult.mlPrediction["score"])],
                      ["Falsch", (detailedResult.mlPrediction["score"])],
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
  );
}
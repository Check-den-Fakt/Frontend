import React, {useState} from 'react';
import './About.css'
import Carousel from "react-bootstrap/Carousel";
import partnerLogos from "../Landing/partner_img.json";


export default function About() {
    const isMobile = window.innerWidth <= 768;
    let mobileImages = null;
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    if (isMobile) {
        mobileImages = <div className="text-center pt-5">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {partnerLogos.map(({ src, alt, link }, id) =>
                    <Carousel.Item key={id}>
                        <div className="img-container">
                            <a href={link}>
                                <img className="carousel-img"
                                     src={src}
                                     alt={alt}
                                     title={alt}
                                     key={id} />
                            </a>
                        </div>
                    </Carousel.Item>
                )}
            </Carousel>
        </div>
    } else {
        mobileImages =
            <div className="text-center">
                <div className="w-100">
                    {partnerLogos.map(({ src, alt, link }, id) =>
                        <a href={link}>
                            <img className="logo-wall"
                                 src={src}
                                 alt={alt}
                                 title={alt}
                                 key={id}
                            />
                        </a>
                    )}
                </div>
            </div>
    }


  return (
      <div className="container my-5">
          <h1>Wir über uns</h1>
          <div className="pt-5 d-flex justify-content-center">
              <div className="polygon background-color-2">
                  <div className="container">
                      <p>
                          Das Team von „Check the Fact“ hat sich beim #WirVsVirus Hackathon kennengelernt und besteht aus einem
                          fünfköpfigen Development- und fünfköpfigen Strategie/Marketing-Team. Aktuell arbeiten wir noch
                          ehrenamtlich. <br/>
                          Die Teamleitung besteht aus Maika Paetzold und Samuel Mauch. Samuel hatte das Projekt
                          ursprünglich beim #WirVsVirus Hackathon eingereicht, ist Research Assistant am Karlsruher Institut für
                          Technologie und Spezialist für Machine Learning und Webdevelopment. Maika ist Leiterin der Agentur
                          mettage.com, gründungserfahren und Verantwortliche bei verschiedenen Medien- und Developmentprojekten
                          für internationale Großkonzerne, Kultureinrichtungen und Verlagshäuser.<br/>
                          Am Code für „Check the Fact“ feilt unser Development Team, bestehend aus dem Neurowissenschaftler Orlando Galashan, dem Cloud
                          Architect Julian Hüppauff, dem Computerlinguisten Julius Tutz und dem Deep-Learning-Experten Leonhard
                          Czarnetzki.Für Marketing- und Customer-Experience sind Maria Weber und Christoph Laurer verantwortlich.<br/>
                          Maria ist Wirtschaftsmediatorin und SAP-Beraterin mit Schwerpunkt auf CX/UX. Christoph verfügt über
                          einen Background als Redakteur, Content-Creator und Marketing-Verantwortlicher. Den Bereich Strategie
                          und Business Development prägen Max Reuter, Management- und Informatik-Student, und Laurenz Czarnetzki,
                          angehender Jurist mit Erfahrung in Medienrecht. <br/>
                          Unser Ziel ist es, Nutzer und Nutzerinnen für Falschmeldungen zu sensibilisieren und
                          Hilfestellung anzubieten, Inhalte schnell zu überprüfen.
                      </p>
                  </div>
              </div>
          </div>
          <h1>Unsere Kooperationen</h1>
          <p>
              Die Wichtigkeit unserer Mission ist nicht nur uns bewusst. Als Projekt mit großem Potenzial freuen wir
              uns darüber, starke Unterstützung auf unserer Seite zu wissen.
          </p>
          {mobileImages}
    </div>
  );
}

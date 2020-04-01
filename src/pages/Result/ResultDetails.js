import React from 'react';
import { Diagram } from '../../components/Diagram';
import './Result.css';
// import { useAccordionToggle } from 'react-bootstrap';

// function CustomToggle({ children, eventKey }) {
//   const decoratedOnClick = useAccordionToggle(eventKey, () =>
//     console.log('')
//   );

//   return (
//     <a onClick={decoratedOnClick}>
//       {children}
//     </a>
//   );
// }

export default function ResultDetails({ details }) {

  
  const detailedContent = [];
  for(let index in details){
    detailedContent.push(
    <div className="row">
      <div className="col">
     
      <Diagram text={details[index]} isFull confidense={details[index]*100} />
      </div>
      <div className="col">
      <h3>{index}</h3>
      </div>
    </div>
    )}

  return (
   
    <div className="text-left margin-top-40">
       <h3>Wie kommt diese Einschätzung zustande?</h3>
       {detailedContent}
      {/* <h1>Wie kommt diese Einschätzung zustande:</h1>   */}
      {/* <div>
        <Diagram text={16} isFull confidense={100} />
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0">Details anzeigen</CustomToggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Accordion>
        <p>{trustScore || 16} seriöse Quellen haben diese Nachricht als glaubwürdig bestätigt.</p>
      </div> */}
    </div>
  );
}

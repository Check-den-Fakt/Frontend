import React, { Component } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import fetchAPI from '../../utils/fetchAPI';
import authentication from '../../utils/react-azure-adb2c'

//import Reaptcha from 'reaptcha';

window.id = 0;

export default class Report extends Component {


  state = {
    text: '',
    sources: [],
    tempSources: {},
    isReported: false,
    isLoading: false,
  };

  componentDidMount() { this.handleAddNew() }

  sourcesInputs = [];

  updateTempSource = (formId, source) =>{
    this.setState('tempSources[formId]', {source: source});
  }

  handleAddNew = () => {
    let formId = "Source_" + this.sourcesInputs.length;
    let formNr = this.sourcesInputs.length + 1;
    this.setState('tempSources[formId]', {source: ""});
    this.setState({ sources: []})
    this.sourcesInputs.push(
      <div className="py-1">
      <Form.Group controlId={formId}>
        <Form.Label>Quelle {formNr}</Form.Label>
        <Form.Control
        onChange={({ currentTarget }) => this.updateTempSource(formId, currentTarget.value)}
        placeholder="Quelle einfügen"
        />
      </Form.Group>
      </div>
    ) 
    
  }

  handleSubmit = async () => {
    for(let elem in this.state.tempSources){
      this.state.sources.push(this.state.tempSources[elem].source)      
    }
    const adb2cToken = authentication.getAccessToken();
    this.setState({ isLoading: true });
    try {
      console.log("Post", { Content: this.state.text, Sources: this.state.sources })
      await fetchAPI.postData('https://we-checkdenfakt-apimgm.azure-api.net/we-fakenews-func/Insert', { Content: this.state.text, Sources: this.state.sources }, adb2cToken);
    } catch (e) {
      this.setState({ isReported: false, isLoading: false })
    } finally {
      this.props.history.push('/voting');
    }
  };


  render () {
    const { text, isLoading } = this.state;
    return (
    <div>
      <div className="text-center">
      <h1 className="display-4">Falschnachricht melden</h1>
      <p className="lead">Du hast eine Falschnachricht entdeckt? Teile sie hier mit uns!</p>
      </div>
     
      <div className="d-flex justify-content-center mt-n3">
        <div className="polygon background-color-1">
        <Form className="container">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control
            onChange={({ currentTarget }) => this.setState({ text: currentTarget.value })} 
            as="textarea" 
            rows="6"
            value={text}
            placeholder="Füge hier eine URL oder Textnachricht ein"
          />
        </Form.Group>
        <div className="py-4">
          <h3>Deine Belege:</h3>
          <Form>
          {this.sourcesInputs.map(sourcesInputs => <div> {sourcesInputs} </div>)} 
          </Form>
          <div className="d-flex justify-content-end">
          <Button onClick={this.handleAddNew} variant="link" className="text-decoration-none"><b className="align-middle">Weiteren Beleg hinzufügen</b> 
              <b className="material-icons icon-btn align-middle">
              add
              </b>
          </Button>
          </div>
        </div>
        {isLoading ? <Spinner animation="border" /> : <Button 
        className="my-3"
        disabled={!text} 
        onClick={this.handleSubmit} 
        variant="primary">
        Nachricht einreichen
      </Button>}
      </Form>
    </div>
    </div>
        </div>
    );
  }
}

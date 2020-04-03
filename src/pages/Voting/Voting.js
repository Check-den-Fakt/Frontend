import React, { Component } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
// import fetchAPI from '../../utils/fetchAPI';
// import authentication from '../../utils/react-azure-adb2c'

window.id = 0;

export default class Voting extends Component {

  state = {
    text: '',
    sources: [],
    tempSource: '',
    isLoading: false,
  };

  handleSubmit = async (status) => {
    
    // const adb2cToken = authentication.getAccessToken();
    // this.setState({ isLoading: true });
    // try {
    //   const response = await fetchAPI.postData('https://we-checkdenfakt-apimgm.azure-api.net/we-sendfact-fa/messagearchive', { text: this.state.text }, adb2cToken)
    //
    // } catch (e) {
    //
    //   this.setState({ isReported: false, isLoading: false })
    // } finally {
    //   this.setState({ isReported: true, isLoading: false })
    // }
  };

  getNews = async () => {
    // ToDO call Loading api
    this.setState(({text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'}));

  };
  componentDidMount() {
    this.getNews();
  }
  render () {
    const { text, isLoading } = this.state;
    // Declare a new state variable, which we'll call "count"
    return (
    <div>
      <div className="text-center">
        <h1 className="display-4">Unterstütze die Check The Fact Community</h1>
        <p className="lead">Wir können noch ein bisschen Hilfe bei der Beurteilung dieser Nachricht gebrauchen.</p>
      </div>
     
      <div className="d-flex justify-content-center mt-n3">
        <div className="polygon background-color-1">
       <Form className="container">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Wie schätzt du folgenden Text ein?</Form.Label>
          <Form.Control
              disabled
            as="textarea" 
            rows="6"
            value={text}
            placeholder="Füge hier eine URL oder Textnachricht ein"

          />
        </Form.Group>
        {isLoading ? <Spinner animation="border" /> :
            <div className="center mt-5">
              <div className="row">
                <Button
                    className="col-sm-2"
                    disabled={!text}
                    onClick={this.handleSubmit(true)}
                    variant="primary"
                >
                  Korrekt
                </Button>
                <Button
                    className="col-sm-2 offset-sm-8"
                    disabled={!text}
                    onClick={this.handleSubmit(false)}
                    variant="warning"
                >
                  Falsch
                </Button>
              </div>
              <div className="row">
                <Button
                    className="col-sm-4 offset-sm-4"
                    disabled={!text}
                    onClick={this.getNews}
                    variant="light"
                >
                  Ich bin mir nicht sicher
                </Button>
              </div>
            </div>}
      </Form>
    </div>
    </div>
        </div>
    );
  }
}

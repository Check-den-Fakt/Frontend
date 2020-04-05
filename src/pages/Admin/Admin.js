import React, {Component} from 'react';
import {AzureAD} from "react-aad-msal";
import {authProvider} from "../../utils/authProvider";
import fetchAPI from "../../utils/fetchAPI";
import {Button} from "react-bootstrap";

window.id = 0;

export default class Admin extends Component {
    state = {
        isLoading: false,
        trustedPublisher: null,
    };
    getTrustedPublisher = async () => {
        this.setState({isLoading: true});

        const token = await authProvider.getAccessToken();
        console.log(token)
        let response = null;
        try{
            response = await fetchAPI.getData(`https://we-trustedpublisher-func.azurewebsites.net/GetTrustedPublisher`, token.accessToken)
        }
        catch (e) {
            this.setState({isLoading: false })
        } finally {
            console.log(response);
            this.setState({isLoading: false, news: response});
        }
    };

    componentDidMount() {
        // this.getTrustedPublisher();
    }

    render() {
        // Declare a new state variable, which we'll call "count"
        return (
            <AzureAD provider={authProvider} forceLogin={true}>
                <span>I'm an admin</span>
                <Button
                    className="col-sm-2"
                    onClick={this.getTrustedPublisher}
                    variant="primary"
                >
                    Korrekt
                </Button>
            </AzureAD>
            // <div>
            //   <div className="text-center">
            //     <h1 className="display-4">Unterstütze die Check The Fact Community</h1>
            //     <p className="lead">Wir können noch ein bisschen Hilfe bei der Beurteilung dieser Nachricht gebrauchen.</p>
            //   </div>
            //
            //   <div className="d-flex justify-content-center mt-n3">
            //     <div className="polygon background-color-1">
            //       <Form className="container">
            //         <Form.Group controlId="exampleForm.ControlTextarea1">
            //           <Form.Label>Wie schätzt du folgenden Text ein?</Form.Label>
            //           <Form.Control
            //               disabled
            //               as="textarea"
            //               rows="6"
            //               value={(!!news && news.Content) || 'Keine weitere Nachrichten zum abstimmen vorhanden...'}
            //           />
            //         </Form.Group>
            //         {isLoading ? <Spinner animation="border"/> :
            //             <div className="center mt-5">
            //               <div className="row">
            //                 <Button
            //                     className="col-sm-2"
            //                     disabled={!news}
            //                     onClick={() => this.handleSubmit(true)}
            //                     variant="primary"
            //                 >
            //                   Korrekt
            //                 </Button>
            //                 <Button
            //                     className="col-sm-2 offset-sm-8"
            //                     disabled={!news}
            //                     onClick={() => this.handleSubmit(false)}
            //                     variant="warning"
            //                 >
            //                   Falsch
            //                 </Button>
            //               </div>
            //               <div className="row">
            //                 <Button
            //                     className="col-sm-4 offset-sm-4"
            //                     disabled={!news}
            //                     onClick={this.getNews}
            //                     variant="light"
            //                 >
            //                   Ich bin mir nicht sicher
            //                 </Button>
            //               </div>
            //             </div>}
            //       </Form>
            //     </div>
            //   </div>
            // </div>
        );
    }
}

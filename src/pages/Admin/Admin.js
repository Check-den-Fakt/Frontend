import React, {Component} from 'react';
import {AzureAD} from "react-aad-msal";
import {authProvider} from "../../utils/authProvider";
import fetchAPI from "../../utils/fetchAPI";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import {Button, Form, Modal} from "react-bootstrap";

window.id = 0;

export default class Admin extends Component {
    state = {
        isLoading: false,
        trustedPublisher: null,
        key: null
    };
    getTrustedPublisher = async () => {
        this.setState({isLoading: true});

        const token = await authProvider.getAccessToken();
        let response = null;
        try {
            response = await fetchAPI.getData(`https://we-checkdenfakt-apimgm.azure-api.net/we-trustedpublisher-func/GetAllPublisher`, token.accessToken)
        } catch (e) {
            this.setState({isLoading: false})
        } finally {
            this.setState({isLoading: false, trustedPublisher: response});
        }
    };

    activateTab = key => {
        this.setState({key});
        if (key === 'trustedPublisher') {
            this.getTrustedPublisher();
        }

    }

    componentDidMount() {
        // this.getTrustedPublisher();
    }

    render() {
        const {key, trustedPublisher} = this.state;
        // Declare a new state variable, which we'll call "count"
        return (
            <AzureAD provider={authProvider} forceLogin={true}>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => this.activateTab(k)}
                >
                    <Tab eventKey="trustedPublisher" title="Trusted Publisher">
                        <TrustedPublisher data={trustedPublisher} reload={this.getTrustedPublisher}/>
                    </Tab>
                    <Tab eventKey="FakeNewReport" title="Fake New Reports">
                        <span>Not implement yet</span>
                    </Tab>
                    <Tab eventKey="TeamMaps" title="Team Maps">
                        <span>Not implement yet</span>
                    </Tab>
                </Tabs>
            </AzureAD>
        );
    }
}

export class TrustedPublisher extends Component {
    state = {
        publisher: {},
        show: false,
        saveUrl: '',
    };

    handleClose = async () => {
        const {publisher, saveFunction} = this.state;
        const token = await authProvider.getAccessToken();
        this.setState({show: false })
        if(!!publisher.Url && !!publisher.Reason && !!publisher.TrustScore) {
            try{
                await fetchAPI.postData(`https://we-checkdenfakt-apimgm.azure-api.net/we-trustedpublisher-func/${saveFunction}`, publisher, token.accessToken)
            }
            catch (e) {
                this.setState({isLoading: false })
            } finally {
                this.setState({isLoading: false, publisher: {}, saveFunction: ''});
                this.props.reload();
            }
        }
    };

    remove = async (row) => {
        const token = await authProvider.getAccessToken();
        const publisher = {
            PartitionKey: row.partitionKey,
            RowKey: row.rowKey,
        };
        try{
            await fetchAPI.postData(`https://we-checkdenfakt-apimgm.azure-api.net/we-trustedpublisher-func/DeleteTrustedPublisher`, publisher, token.accessToken)
        }
        catch (e) {
            this.setState({isLoading: false })
        } finally {
            this.setState({isLoading: false, publisher: {}, saveFunction: ''});
            this.props.reload();
        }
    };

    add = () => {
        const publisher = {
            Url: '',
            Reason: '',
            TrustScore: 0.
        };
        this.props.data.push(publisher);
        this.setState({show: true, publisher: publisher, saveFunction: 'AddTrustedPublisher'});
    };

    edit = (row) => {
        const publisher = {
            Url: row.url,
            Reason: row.reason,
            TrustScore: row.trustScore,
        };
        this.props.data.push(publisher);
        this.setState({show: true, publisher: publisher, saveFunction: 'UpdateTrustedPublisher'});
    };

    handleChange = e => {
        const {publisher} = this.state;
        publisher[e.target.name] = e.target.value;
        this.setState({ publisher: publisher});
    };
    render() {
        const {data} = this.props;
        const {show} = this.state;
        return !data ? 'Loading' : <div>
            <Button
                onClick={this.add}
            >
                add
            </Button>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Url</th>
                    <th>reason</th>
                    <th>Score</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, i) =>
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{row.url}</td>
                        <td>{row.reason}</td>
                        <td>{row.trustScore}</td>
                        <td>
                            <Button
                                onClick={() => this.remove(row)}
                            >
                                remove
                            </Button>
                            <Button
                                onClick={() => this.edit(row)}
                            >
                                Edit
                            </Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Modal show={show} onHide={this.handleClose}>
                <Form.Group>
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                        name="Url"
                        onChange={this.handleChange}
                        placeholder="Url"
                        value={this.state.publisher.Url}
                    />
                    <Form.Label>Reason</Form.Label>
                    <Form.Control
                        name="Reason"
                        onChange={this.handleChange}
                        placeholder="Reason"
                        as="textarea"
                        value={this.state.publisher.Reason}
                    />
                    <Form.Label>Score</Form.Label>
                    <Form.Control
                        name="TrustScore"
                        onChange={this.handleChange}
                        placeholder="TrustScore"
                        value={this.state.publisher.TrustScore}
                    />
                </Form.Group>
                <Button
                    onClick={this.handleClose}
                >
                    save
                </Button>
            </Modal>
        </div>
    }
}

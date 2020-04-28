import React, {Component} from "react";
import {authProvider} from '../utils/authProvider'
import { Redirect } from 'react-router';

export default class Auth extends Component {
    state = {
        authenticated: false,
        isInitialized: false
    };
    msalInstance = authProvider.getMsalInstance(this.props.type);
    loginRequest = authProvider.getLoginRequest(this.props.type);

    login = () => {
        if(authProvider.isAuthenticated(this.props.type)) {
            this.setState({authenticated: true, isInitialized: true});
        } else {
            this.msalInstance.handleRedirectCallback((error, response) => {
                let authenticated;
                if (error) {
                    console.error('could not be authenticated', error);
                    authenticated = false;
                } else {
                    authenticated = !!response;
                }
                this.setState({authenticated: authenticated, isInitialized: true});
            });
            this.msalInstance.loginRedirect(this.loginRequest);
        }
    }

    componentDidMount() {
        this.login()
    }
    render() {
        const { authenticated, isInitialized } = this.state
        const {children} = this.props;
        let element = <span/>;
        if(isInitialized) {
            if(authenticated){
                element = <div>{children}</div>
            } else {
                element = <Redirect to='/'/>;
            }
        }
        return element;
    }
}

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
        console.log('hier', 'login')
        if(authProvider.isAuthenticated(this.props.type)) {
            console.log('hier', 'isAutnenticate');
            this.setState({authenticated: true, isInitialized: true});
        } else {
            this.msalInstance.loginPopup(this.loginRequest)
                .then(response => this.setState({authenticated: !!response, isInitialized: true}))
                .catch(err => {
                    console.error(err);
                    this.setState({authenticated: false, isInitialized: true})
                });
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

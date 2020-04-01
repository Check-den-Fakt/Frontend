import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authentication from './utils/react-azure-adb2c';

authentication.initialize({
    // optional, will default to this
    instance: 'https://checkdenfaktb2c.b2clogin.com/tfp/', 
    // your B2C tenant
    tenant: 'CheckDenFaktB2C.onmicrosoft.com',
    // the policy to use to sign in, can also be a sign up or sign in policy
    signInPolicy: 'B2C_1_SignUp-SignIn',
    // the the B2C application you want to authenticate with
    applicationId: '66d12240-58e5-479c-82f5-e1a31d851727',
    // where MSAL will store state - localStorage or sessionStorage
    cacheLocation: 'sessionStorage',
    // the scopes you want included in the access token
    scopes: ['openid'],
    // optional, the redirect URI - if not specified MSAL will pick up the location from window.href
    validateAuthority: false,
    redirectUri: 'https://www.check-den-fakt.de/report',

    // optional, the URI to redirect to after logout
   // postLogoutRedirectUri: window.location.origin,
});



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


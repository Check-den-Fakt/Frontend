import {MsalAuthProvider, LoginType} from 'react-aad-msal';

const config = {
    auth: {
        authority: 'https://login.microsoftonline.com/WirVsVirusKommunikation.onmicrosoft.com',
        clientId: 'ff72bf0d-1f31-43e2-ba44-fa0cb5bb16a0',
        redirectUri: `${window.location.origin}/auth.html`,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: false,
    },
};

const options = {
    loginType: LoginType.Popup,
    tokenRefreshUri: `${window.location.origin}/auth.html`,
}

const authenticationParameters = {
    scopes: ['User.Read'],
};

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options);



// https://localhost:44333/signin-oidc

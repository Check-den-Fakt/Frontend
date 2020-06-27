import * as Msal from "msal";

export const InstanceType = {
    COMMUNITY: 'community',
    ADMIN: 'admin',
}

const msalConfigCommunity = {
    auth: {
        clientId: '66d12240-58e5-479c-82f5-e1a31d851727',
        authority: 'https://checkdenfaktb2c.b2clogin.com/CheckDenFaktB2C.onmicrosoft.com/b2c_1_signup-signin',
        validateAuthority: false,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

const msalConfigAdmin = {
    auth: {
        clientId: 'ff72bf0d-1f31-43e2-ba44-fa0cb5bb16a0',
        authority: 'https://login.microsoftonline.com/WirVsVirusKommunikation.onmicrosoft.com',
        validateAuthority: false,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

const loginRequestAdmin = {
    scopes: ['openid'],
}

const loginRequestCommunity = {
    scopes: ['openid'],
};

const tokenRequestAdmin = {
    scopes: ['User.Read'],
}

const tokenRequestCommunity = {
    scopes: [],
};

const getMsalInstance = (instanceType) => instanceType === InstanceType.ADMIN ? msalAdmin : msalCommunity;
const getLoginRequest= (instanceType) => instanceType === InstanceType.ADMIN ? loginRequestAdmin : loginRequestCommunity;
const getTokenRequest= (instanceType) => instanceType === InstanceType.ADMIN ? tokenRequestAdmin : tokenRequestCommunity;
const getConfig = (instanceType) => instanceType === InstanceType.ADMIN ? msalConfigAdmin : msalConfigCommunity;

const token = async (instanceType) => {
    const msalInstance = getMsalInstance(instanceType);
    const scopes =  getTokenRequest(instanceType)
    let response;
    try {
        response = await msalInstance.acquireTokenSilent(scopes);
    } catch(err) {
        if (err.name === "InteractionRequiredAuthError") {
            try {
                response = await msalInstance.acquireTokenPopup(scopes)
            } catch (e) {
                console.log('could not get token',e, err);
                return;
            }
        }
        console.error(err)
    }
    return response && response.accessToken;
};

const isAuthenticated = (instanceType) => {
    const msalInstance = getMsalInstance(instanceType);
    const config = getConfig(instanceType);
    const user = msalInstance.getAccount();
    return !!user && user.idTokenClaims.aud === config.auth.clientId;
}

const msalCommunity = new Msal.UserAgentApplication(msalConfigCommunity);

const msalAdmin = new Msal.UserAgentApplication(msalConfigAdmin);

export const authProvider = {
    getMsalInstance: (instanceType) => getMsalInstance(instanceType),
    getLoginRequest: (instanceType) => getLoginRequest(instanceType),
    getAccessToken: async (instanceType) => token(instanceType),
    isAuthenticated: (instanceType) => isAuthenticated(instanceType),
}

var klaroConfig = {
    elementID: 'klaro',
    storageMethod: 'cookie',
    cookieName: 'klaro',
    cookieExpiresAfterDays: 180,
    privacyPolicy: '/dsgvo',
    default: true,
    mustConsent: false,
    acceptAll: true,
    // replace "decline" with cookie manager modal
    hideDeclineAll: false,
    translations: {
        // If you erase the "consentModal" translations, Klaro will use the
        // bundled translations.
        de: {
            consentModal: {
                description:
                    'Hier können Sie einsehen und anpassen, welche Information wir über Sie sammeln.',
            },
            insights: {
                description: 'Sammeln von Besucherstatistiken'
            },
            azureB2C: {
                description: 'Benutzeranmeldung',
            },
            purposes: {
                analytics: 'Besucher-Statistiken',
                user: 'Benutzer login',
            },
        },
        en: {
            consentModal: {
                description:
                    'Here you can see and customize the information that we collect about you.',
            },
            insights: {
                description: 'Collecting of visitor statistics'
            },
            azureB2C: {
                description: 'User login and registration',
            },
            purposes: {
                analytics: 'Analytics',
                user: 'Login',
            },
        },
    },
    // This is a list of third-party apps that Klaro will manage for you.
    apps: [
        {
            name: 'insights',
            default: true,
            title: 'Azure Insights',
            purposes: ['analytics'],
            cookies: [
                /^ai_.*$/, '/',
                /^AI_.*$/, '/',
            ],
            required: false,
            optOut: false,
            onlyOnce: true,
        },
        {
            name: 'azureB2C',
            default: true,
            title: 'Azure B2C',
            purposes: ['user'],
            required: true,
            optOut: false,
            onlyOnce: true,
        },
    ],
};

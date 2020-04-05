import React from 'react';
import { useTranslation } from 'react-i18next';
import "./Footer.css";

export default function Footer () {
    const { t } = useTranslation();
    return (
        <footer className="footer p-3 text-center">
            <div className="row">
                <div className="col">
                    <a href="/imprint">
                        {t('imprint')} 
                    </a>
                </div>
                <div className="col">
                    &middot;
                </div>
                <div className="col">
                    <a href="/dsgvo">
                        {t('dataPrivacyPolicy')} 
                    </a>
                </div>
                <div className="col">
                    &middot;
                </div>
                <div className="col">
                    <a href="/imprint">
                        {t('Contact')}
                    </a>
                </div>
            </div>
        </footer>
    );
}

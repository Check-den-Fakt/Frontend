import React from 'react';
import { useTranslation } from 'react-i18next';
import "./Footer.css";

export default function Footer () {
    const { t } = useTranslation();
   
    return (
        <footer className="footer m-5">
            <div className="container">
                <div className="row">
                    <div className="col fact-footer-col">
                        <a href="/imprint">
                            {t('imprint')} &middot;
                        </a>
                    </div>
                    <div className="col fact-footer-col">
                        <a href="/dsgvo">
                            {t('dataPrivacyPolicy')} &middot;
                        </a>
                    </div>
                    <div className="col fact-footer-col">
                        <a href="/imprint">
                            {t('Contact')}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

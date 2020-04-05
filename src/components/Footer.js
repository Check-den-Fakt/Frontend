import React from 'react';
import { useTranslation } from 'react-i18next';
import "./Footer.css";

export default function Footer () {
    const { t } = useTranslation();
   
    return (
        <footer className="footer p-5">
                <div className="row">
                    <div className="col fact-footer-col">
                        <a href="/imprint">
                            {t('imprint')} 
                        </a>
                    </div>
                    &middot;
                    <div className="col fact-footer-col">
                        <a href="/dsgvo">
                            {t('dataPrivacyPolicy')} 
                        </a>
                    </div>
                    &middot;
                    <div className="col fact-footer-col">
                        <a href="/imprint">
                            {t('Contact')}
                        </a>
                    </div>
                </div>
        </footer>
    );
}

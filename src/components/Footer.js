import React from 'react';
import { useTranslation } from 'react-i18next';
import "./Footer.css";

export default function Footer () {
    const { t } = useTranslation();
    return (
        <footer>
            <div className="container">
                <div className="d-flex justify-content-between flex-wrap">


                <div>
                    <h3 className="text-white">Legal</h3>
                    <div className="desc">
                    <a href="/imprint">
                        {t('Contact')}
                    </a>
                    <a href="/imprint">
                        {t('imprint')} 
                    </a>
                    <a href="/dsgvo">
                        {t('dataPrivacyPolicy')} 
                    </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-white">Social</h3>
                    <div className="ico">
                        <a href="https://www.linkedin.com/company/checkdenfakt">
                            <img className="social-ico" src="/img/social_icons/linkedin_circle.svg" alt="LinkedIn"></img>
                        </a>
                        <a href="https://www.facebook.com/checkdenfakt-103714511275731">
                            <img className="social-ico" src="/img/social_icons/facebook_circle.svg" alt="Facebook"></img>
                        </a>
                        <a href="https://www.youtube.com/channel/UC43ijg0E2n5BVkN4NUQhk0w">
                            <img className="social-ico" src="/img/social_icons/youtube_circle.svg" alt="YouTube"></img>
                        </a>
                        <a href="https://www.instagram.com/checkdenfakt">
                            <img className="social-ico" src="/img/social_icons/instagram_circle.svg" alt="Instagram"></img>
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    );
}

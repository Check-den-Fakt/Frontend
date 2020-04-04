import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import LanguageSelector from './LanguageSelector';
import "./NavMenu.css";

export default function NavMenu () {
  const { t } = useTranslation();

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="light">
      <Navbar.Brand href="/">
        <img src="img/header_logo.svg" width="200" className="d-inline-block align-top"
        alt={t('checkTheFactCheckBeforeYouShare')}
        title={t('checkTheFactCheckBeforeYouShare')}/>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/rules">{t('goldenRules')}</Nav.Link>
          <Nav.Link href="/about">{t('aboutUs')}</Nav.Link>
        </Nav>
        <LanguageSelector />
      </Navbar.Collapse>
    </Navbar>
  );
}

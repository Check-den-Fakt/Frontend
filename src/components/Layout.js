import React, { Component } from 'react';
import NavMenu from './NavMenu';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import './Layout.css';
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container className="fact-layout">
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}

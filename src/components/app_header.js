import React from 'react';
import { Link } from 'react-router';
import logo from '../images/logo.svg';
import '../style/app_header.css';

export default function () {
  return (
    <header className="main-header">
      <Link to="/" className="logo logo-header">
        <span className="logo-lg">
          <b>React</b>BLOG
          <img src={logo} alt="logo" className="logo-img" />
        </span>
      </Link>
      <nav className="navbar navbar-static-top">
      </nav>
    </header>
  );
}
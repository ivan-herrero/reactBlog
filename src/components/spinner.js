import React from 'react';
import logo from '../images/logo.svg';

import '../style/spinner.css';

export default function Spinner(props) {
  return (
    <div className="spinner">
      <img src={logo} alt="spinner" className="logo-img fa-spin" />
    </div>
  );
}
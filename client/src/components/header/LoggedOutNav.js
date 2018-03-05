import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/logo.svg';

const LoggedOutNav = () =>
  <nav className="demo">
    <a className="brand" href="/">
      <img src={logo} className="App-logo" alt="logo" />
      <span>BLOGS APP</span>
    </a>
    <input id="bmenub" type="checkbox" className="show" />
    <label htmlFor="bmenub" className="burger pseudo button">menu</label>

    <div className="menu">
      <Link to={`/register`} className="pseudo button icon-picture">Register</Link>
      <Link to={`/login`} className="button icon-puzzle">Login</Link>
    </div>
  </nav>

export default LoggedOutNav




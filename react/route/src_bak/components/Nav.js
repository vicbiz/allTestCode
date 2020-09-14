import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import FtgLogoWhite from "../assets/img/ftg-logo-white.svg";

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <NavLink
          exact
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/"
        >
          <img
            className="ftgTopLogo"
            src={FtgLogoWhite}
            alt="Forbes Travel Guide"
          />
        </NavLink>
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/destinations"
        >
          Destinations
        </NavLink>
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/about"
        >
          About
        </NavLink>
      </nav>
    );
  }
}

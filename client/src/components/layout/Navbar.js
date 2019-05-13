import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white bordered">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              <img src="https://cdn.freebiesupply.com/images/large/2x/accenture-logo-png-transparent.png" alt="ACCENTURE" height = "60px"/> 
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
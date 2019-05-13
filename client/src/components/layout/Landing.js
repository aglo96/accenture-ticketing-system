import React, { Component } from "react";
import { Link } from "react-router-dom";


class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Welcome</b> to {" "}
              <span style={{ fontFamily: "monospace" }}>Accenture</span> Ticket Support System
            </h4>
            {/* <p className="flow-text grey-text text-darken-1">
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p> */}
            <br />
            <Link to = '/admin'
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Admin
            </Link>
            <Link to= '/user'
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              User
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import {connect} from "react-redux";
import { logoutAdmin } from "../../actions/authActions";
import NavbarAdmin from "./NavbarAdmin";
import Navbar from "./Navbar";
import NavbarUser from "./NavbarUser"

class DisplayedNavbar extends Component {
    componentDidMount() {
        M.AutoInit();
    }
    display() {
        if (this.props.auth.isAuthenticated  === true && this.props.auth.isAdmin === true) {
          return <NavbarAdmin/>
        } else if (this.props.auth.isAuthenticated === true) {
          return <NavbarUser/>
        }else return <Navbar/>
      }
    

  render() {
      const display = this.display();
    return (
        display
    );
  }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    {logoutAdmin}
  )(DisplayedNavbar);

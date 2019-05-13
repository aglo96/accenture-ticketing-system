import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import {connect} from "react-redux";
import { logoutUser } from "../../actions/authActions";

class NavbarUser extends Component {
    componentDidMount() {
        M.AutoInit();
    }

  render() {
    return (
        <div className= "navbar-fixed"> 
        <nav class="nav-extended">
        <div class="nav-wrapper white">
          <Link  to = "/user/dashboard" className="col s5 brand-logo center black-text"><img src="https://cdn.freebiesupply.com/images/large/2x/accenture-logo-png-transparent.png" alt="ACCENTURE" height = "60px"/></Link>
           <ul id="nav-mobile" class="right hide-on-med-and-down">
            {/* <li><a href="sass.html">Sass</a></li> */}
            <li><Link target = "_self" className = "blue-text" to = {"/user/profile/" + this.props.auth.user.id}><i class="large material-icons">account_box</i> </Link>  </li>
            <li><button class = "waves-effect waves-light btn-floating btn-large  red" onClick= {() => this.props.logoutUser()}><i class="material-icons">exit_to_app</i></button></li>
          </ul>
        </div>
        <div class="nav-content">
          <ul class="tabs white ">
            <li class="tab"><Link target = "_self" className = "black-text"  to="/user/dashboard">Tickets</Link></li>
            <li class="tab"><Link target = "_self" className = "black-text" to="/user/chat">Chat</Link></li>
          </ul>
        </div>
      </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    {logoutUser}
  )(NavbarUser);

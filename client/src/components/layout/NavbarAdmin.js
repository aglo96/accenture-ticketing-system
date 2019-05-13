import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import {connect} from "react-redux";
import { logoutAdmin } from "../../actions/authActions";

class NavbarAdmin extends Component {
    componentDidMount() {
        M.AutoInit();
    }

  render() {
    return (
        <div className= "navbar-fixed"> 
        <nav class="nav-extended">
        <div class="nav-wrapper white">
          <Link  to = "/admin/dashboard" className="col s5 brand-logo center black-text"><img src="https://cdn.freebiesupply.com/images/large/2x/accenture-logo-png-transparent.png" alt="ACCENTURE" height = "60px"/> </Link>
           <ul id="nav-mobile" class="right hide-on-med-and-down">
            {/* <li><a href="sass.html">Sass</a></li> */}
            <li><Link target = "_self" className = "blue-text" to ={"/admin/profile/" +  this.props.auth.admin.id}><i class=" material-icons large">account_box</i> </Link></li>
            <li><button class = "waves-effect waves-light btn-floating btn-large  red" onClick= {() => this.props.logoutAdmin()}><i class="material-icons">exit_to_app</i></button></li>
          </ul>
        </div>
        <div class="nav-content">
          <ul class="tabs white ">
            <li class="tab"><Link target = "_self" className = "black-text"  to="/admin/newTickets">New Tickets</Link></li>
            <li class="tab"><Link target = '_self' className = "black-text" to="/admin/dashboard">My Tickets</Link></li>
            <li class="tab"><Link target = "_self" className = "black-text" to="/admin/chat">Chat</Link></li>
          </ul>
        </div>
      </nav>
      </div>
    //   <div className="navbar-fixed">
    //     <nav className="z-depth-0">
    //       <div className="nav-wrapper white">
    //         <Link
    //           to="/"
    //           style={{
    //             fontFamily: "monospace"
    //           }}
    //           className="col s5 brand-logo center black-text"
    //         >
    //           <i className="material-icons">code</i>
    //           ACCENTURE
    //         </Link>
    //       </div>
    //     </nav>
    //   </div>
    );
  }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    {logoutAdmin}
  )(NavbarAdmin);

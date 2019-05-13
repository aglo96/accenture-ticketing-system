import React from "react";
import ReactDOM from "react-dom";
import ChatAppAdmin from "./AppAdmin";
import Spinner from "./Spinner";
//import registerServiceWorker from "./registerServiceWorker";
import firebase from "../firebase";
// import "materialize-css"
import "semantic-ui-css/semantic.min.css";
import M from "materialize-css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import {  connect } from "react-redux";
import { setUser, clearUser } from "../actions/authActions";


class Root extends React.Component {
  componentDidMount() {
      M.AutoInit();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user);
        this.props.setUser(user);
        this.props.history.push("/admin/chat");
      } else {
        this.props.history.push("/login");
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (

       <ChatAppAdmin/>
 
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuthAdmin = withRouter(
  connect(
    mapStateFromProps,
    { setUser, clearUser }
  )(Root)
);

export default RootWithAuthAdmin;

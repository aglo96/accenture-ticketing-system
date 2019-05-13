import React from "react";
import ReactDOM from "react-dom";
import ChatApp from "./App";
import Spinner from "./Spinner";
//import registerServiceWorker from "./registerServiceWorker";
import firebase from "../firebase";
// import "materialize-css"
import "semantic-ui-css/semantic.min.css";

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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user);
        this.props.setUser(user);
        this.props.history.push("/user/chat");
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
       <ChatApp/>
    );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
});

const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser, clearUser }
  )(Root)
);

export default RootWithAuth;

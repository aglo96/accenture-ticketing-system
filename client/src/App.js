import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser, setCurrentAdmin, logoutAdmin,setUser, clearUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateAdminRoute from "./components/private-route/PrivateAdminRoute"
import Dashboard from "./components/dashboard/Dashboard";
import LandingUser from "./components/layout/LandingUser";
import LandingAdmin from "./components/layout/LandingAdmin";
import RegisterAdmin from "./components/auth/RegisterAdmin";
import LoginAdmin from "./components/auth/LoginAdmin";
import DashBoardAdmin from "./components/dashboard/DashBoardAdmin";
import Index from "./components/layout";
import { RoutedTabs, NavTab } from 'react-router-tabs';
import NewTabContent from "./components/layout/NewTabContent";
import Edit from "./components/layout/Edit";
import Create from "./components/layout/Create";
import Show from "./components/layout/Show";
import NewTabContentAdmin from "./components/layout/NewTabContentAdmin";
import EditAdmin from "./components/layout/EditAdmin";
import ShowAdmin from "./components/layout/ShowAdmin";
import {connect} from "react-redux";
import NavbarAdmin from "./components/layout/NavbarAdmin";
import AllTicketsAdmin from "./components/layout/AllTicketsAdmin";
import ShowAdminInProgress from "./components/layout/ShowAdminInProgress";
import DisplayedNavbar from "./components/layout/displayedNavbar"
import RootWithAuth from "./components/index";
import firebase from "./firebase";
import RootWithAuthAdmin from "./components/indexAdmin";
import Profile from "./components/layout/Profile";
import ProfileAdmin from "./components/layout/ProfileAdmin";
const NewTickets = () => (
  <div>
  <h2>New</h2>
  </div>
);



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  if (decoded.type === "user") {
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./";
  }
} else if (decoded.type === "admin") {
  store.dispatch(setCurrentAdmin(decoded));
  // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutAdmin());
      // Redirect to login
      window.location.href = "./";
    }
}
}




class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user);
        store.dispatch(setUser(user));
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        store.dispatch(clearUser());
      }
    });
  }

  render() {


    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <DisplayedNavbar/>
 
            {/* {this.state.navbar} */}
  

            <div class = "divider"></div>
            <div class = "section" style = {{margin: 25}}>
            <div class = "row">
          

            <Route exact path="/" component={Landing} />
            <Route exact path="/user" component={LandingUser}/>
            <Route exact path="/admin" component={LandingAdmin}/>
            <Route exact path="/user/register" component={Register} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/admin/register" component={RegisterAdmin} />
            <Route exact path="/admin/login" component={LoginAdmin} />
            <Switch>

       
              <PrivateRoute exact path={'/newTickets'} component={NewTabContent} />
              <PrivateRoute path='/user/newTickets/edit/:id' component={Edit} />
              <PrivateRoute path='/user/newTickets/create' component={Create} />
              <PrivateRoute path='/user/newTickets/show/:id' component={Show } />
              <PrivateRoute path = "/user/profile/:id" component = {Profile}/>
              <PrivateRoute path ='/user/chat' component = {RootWithAuth}/>
              <PrivateRoute exact path="/user/dashboard" component={NewTabContent} />
              <PrivateRoute exact path = "/admin/profile/:id" component = {ProfileAdmin}/>
              <PrivateAdminRoute exact path = "/admin/chat" component = {RootWithAuthAdmin} />
              <PrivateAdminRoute exact path = "/admin/newTickets" component = {NewTabContentAdmin} />
              <PrivateAdminRoute exact path = "/admin/newTickets/show/:id" component = {ShowAdmin} />
              <PrivateAdminRoute exact path="/admin/dashboard" component={AllTicketsAdmin}/>
              <PrivateAdminRoute exact path="/admin/dashboard/show/:id" component={ShowAdminInProgress}/>
              <PrivateAdminRoute exact path="/admin/dashboard/edit/:id" component={EditAdmin}/>
              <PrivateRoute path = "/newTickets" component = {NewTickets}/>

            </Switch>
            </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}


export default App

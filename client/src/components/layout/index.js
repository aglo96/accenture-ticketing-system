import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';

import { RoutedTabs, NavTab } from 'react-router-tabs';
import { Switch, Redirect } from 'react-router-dom';
import 'react-router-tabs/styles/react-router-tabs.css'
import NewTabContent from "./NewTabContent";
import Edit from "./Edit";
import Create from "./Create";
import Show from "./Show";
import Navbar from "./Navbar";

const NewTickets = () => (
  <div>
  <h2>New</h2>
  </div>
);
const InProgressTickets = () => (
  <div>
  <h2>In Progress</h2>
  </div>
);
const DoneTickets = () => (
  <div>
  <h2>Done1</h2>
  </div>
);
class Index extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        {/* <ControlledTabs />  */}
        <NavTab to = "/newTickets">New</NavTab>
        <NavTab to = "/inProgressTickets">In Progress</NavTab>
        <NavTab to = "/doneTickets">Done</NavTab>
        <Switch>
        <Route exact path={'/'} render={() => <Redirect replace to={'/newTickets'} />} />
        <Route exact path={'/newTickets'} component={NewTabContent} />
        <Route path={'/inProgressTickets'} component={InProgressTickets} />
        <Route path={'/doneTickets'} component={DoneTickets} />
        <Route path='/newTickets/edit/:id' component={Edit} />
        <Route path='/newTickets/create' component={Create} />
        <Route path='/newTickets/show/:id' component={Show } />
      </Switch>


      </div>

)
    }
  }
  export default Index;

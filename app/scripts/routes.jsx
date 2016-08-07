import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App.jsx';
// import Main from './Main.jsx';
import ListView from './components/ListView.jsx';
import Login from './containers/Login.jsx';
import Signup from './containers/Signup.jsx';
import Dashboard from './containers/Dashboard.jsx';
import CreateListing from './containers/CreateListing.jsx';


export default (
  <Route path="/" component={App} >
    <IndexRoute component={ListView} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/createlisting" component={CreateListing} />
  </Route>
);


import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import { createBrowserHistory } from "history";

import './App.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import Login from './views/Login';
import Register from './views/Register'
import MainLayout from './Layouts/MainLayout';
import Loader from './components/Loading';
import AdminPanelLayout from './Layouts/AdminPanelLayout';
const customHistory = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <>
        <NotificationContainer />
        <Router history={customHistory}>
          <Switch>
            <Route exact path="/login" component={Login} history={customHistory}/>
            <Route exact path="/registration" component={Register} history={customHistory}/>
            <Route path="/adminpanel/" component={AdminPanelLayout} history={customHistory}/>
            <Route path="/" component={MainLayout}  history={customHistory}/>
            <Redirect to="/login" />
          </Switch>
        </Router>
        <Loader />
      </>
    );
  }
}

export default App;

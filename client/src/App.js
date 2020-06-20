import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Welcome from './components/pages/Welcome';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setauthtoken';

import { Provider } from 'react-redux';
import store from './Store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Alerts />
            <Switch>
              <Route exact path='/' component={Welcome} />
              <Route exact path='/welcome' component={Welcome} />
              <PrivateRoute exact path='/contacts' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

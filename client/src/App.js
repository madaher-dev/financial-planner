import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Admin from './components/pages/Admin';

import Welcome from './components/pages/Welcome';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setauthtoken';
import ForgotPass from './components/auth/ForgotPass';

import { Provider } from 'react-redux';
import store from './Store';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Alerts from './components/layout/Alerts';

import ResetPassword from './components/auth/ResetPassword';
import NewPlanner from './components/auth/NewPlanner';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Provider store={store}>
        <Router>
          <Fragment>
            <CssBaseline />
            <Navbar />
            <Alerts />
            <Switch>
              <Route exact path='/' component={Welcome} />
              <Route exact path='/forgotPassword' component={ForgotPass} />
              <PrivateRoute exact path='/contacts' component={Home} />
              <AdminRoute path='/admin' component={Admin} />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/reset/:email_token'
                component={ResetPassword}
              />
              <Route
                exact
                path='/newplanner/:email_token'
                component={NewPlanner}
              />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
            <Footer />
          </Fragment>
        </Router>
      </Provider>
    </div>
  );
};

export default App;

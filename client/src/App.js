import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
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
import AuthDrawer from './components/material/AuthDrawer';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Alerts from './components/layout/Alerts';
import { Typography, Container, Link, Box } from '@material-ui/core';
import Planners from './components/Planners/Planners'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Financial Planner
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
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
            <AuthDrawer />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth='lg' className={classes.container}>
                <Switch>
                  <Route exact path='/' component={Welcome} />
                  <Route exact path='/forgotPassword' component={ForgotPass} />
                  <Route exact path='/welcome' component={Welcome} />
                  <PrivateRoute exact path='/contacts' component={Home} />
                  <AdminRoute exact path='/admin' component={Admin} />
                  <AdminRoute exact path='/admin/planners' component={Planners} />
                  <Route exact path='/about' component={About} />

                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
                <Box pt={4}>
                  <Copyright />
                </Box>
              </Container>
            </main>
          </Fragment>
        </Router>
      </Provider>
    </div>
  );
};

export default App;

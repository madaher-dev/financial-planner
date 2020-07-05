import React, { useState, useEffect, Fragment } from 'react';
//import { loginUser, clearErrors } from '../../actions/userActions';
import { loginPlanner, clearErrors } from '../../actions/plannerActions';
import { setAlert } from '../../actions/alertActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  text: {
    textAlign: 'center',
  },
  forgot: {
    float: 'right',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
    paddingBottom: theme.spacing(4),
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(20),
  },
}));

const Login = ({
  loginPlanner,
  isAuthenticated,
  error,
  isAdmin,
  setAlert,
  clearErrors,
}) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (error) {
      if (error.errors) {
        setAlert(error.errors[0].msg, 'error');
        clearErrors();
      }
    }
  }, [error, setAlert, clearErrors]);

  const { email, password } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'error');
    } else {
      loginPlanner({
        email,
        password,
      });
    }
  };

  const classes = useStyles();
  if (isAdmin) {
    return <Redirect to='/admin' />;
  } else if (isAuthenticated) {
    return <Redirect to='/planner' />;
  } else {
    return (
      // <main className={classes.content}>
      <Fragment>
        <Container maxWidth='lg' className={classes.container}>
          <Grid container>
            <Grid item xs={false} sm={4} />
            <Grid item xs={12} sm={4}>
              <form className={classes.root} onSubmit={onSubmit}>
                <div className={classes.text}>
                  <Typography gutterBottom variant='h3'>
                    Account{' '}
                    <Typography color='primary' variant='inherit'>
                      Login
                    </Typography>
                  </Typography>
                </div>
                <Divider variant='middle' />
                <div>
                  <TextField
                    id='outlined-required'
                    label='Email Address'
                    variant='outlined'
                    type='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id='outlined-password-input'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    variant='outlined'
                    name='password'
                    value={password}
                    onChange={onChange}
                    fullWidth
                  />
                </div>
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    fullWidth
                  >
                    Login
                  </Button>
                  <Button
                    color='primary'
                    className={classes.forgot}
                    to='/forgotPassword'
                    component={Link}
                  >
                    Forgot Password
                  </Button>
                </div>
              </form>
            </Grid>
            <Grid item xs={false} sm={4} />
          </Grid>
        </Container>
      </Fragment>
      //  </main>
    );
  }
};

Login.propTypes = {
  loginPlanner: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  isAdmin: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.planners.isAuthenticated,
  error: state.planners.error,
  isAdmin: state.planners.isAdmin,
});

export default connect(mapStateToProps, {
  loginPlanner,
  clearErrors,
  setAlert,
})(Login);

import React, { useState, useEffect } from 'react';
import { loginUser, clearErrors } from '../../actions/userActions';
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
}));

const Login = ({
  loginUser,
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
      setAlert(error.errors[0].msg, 'error');
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  const { email, password } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'error');
    } else {
      loginUser({
        email,
        password,
      });
    }
  };

  const classes = useStyles();
  if (isAdmin) {
    return <Redirect to='/admin' />;
  } else if (isAuthenticated) {
    return <Redirect to='/contacts' />;
  } else {
    return (
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
    );
  }
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  isAdmin: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  error: state.users.error,
  isAdmin: state.users.isAdmin,
});

export default connect(mapStateToProps, {
  loginUser,
  clearErrors,
  setAlert,
})(Login);

import React, { useState, useEffect } from 'react';
import { forgotPass, clearErrors } from '../../actions/userActions';
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
import { setAlert } from '../../actions/alertActions';

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

const ForgotPass = ({
  forgotPass,
  clearErrors,
  setAlert,
  forgot,
  error,
  isAdmin,
  isAuthenticated,
}) => {
  useEffect(() => {
    if (error) {
      setAlert(error.errors[0].msg, 'error');
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  useEffect(() => {
    if (forgot) {
      setAlert('Reset Email Sent', 'success');
    }
    clearErrors();
  }, [forgot, setAlert, clearErrors]);

  const [user, setUser] = useState({
    email: '',
  });

  const { email } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      setAlert('Please entert your email', 'error');
    } else {
      forgotPass({
        email,
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
                Forgot{' '}
                <Typography color='primary' variant='inherit'>
                  Password
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
              <Button
                variant='contained'
                color='primary'
                type='submit'
                fullWidth
              >
                Send Email
              </Button>
            </div>
          </form>
        </Grid>
        <Grid item xs={false} sm={4} />
      </Grid>
    );
  }
};

ForgotPass.propTypes = {
  forgotPass: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  isAdmin: PropTypes.bool,
  forgot: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  error: state.users.error,
  isAdmin: state.users.isAdmin,
  forgot: state.users.forgot,
});

export default connect(mapStateToProps, {
  forgotPass,
  clearErrors,
  setAlert,
})(ForgotPass);

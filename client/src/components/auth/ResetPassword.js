import React, { useState, useEffect } from 'react';
import setAuthToken from '../../utils/setauthtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/userActions';
import { useParams, Redirect } from 'react-router-dom';

import Spinner from '../layout/Spinner';

import axios from 'axios';
import {
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setAlert } from '../../actions/alertActions';
import { loadUser } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  text: {
    textAlign: 'center',
  },
}));

const ResetPassword = ({ error, setAlert, loadUser }) => {
  let { email_token } = useParams();

  const [newPassword, setPass] = useState({
    email: '',
    password: '',
    password2: '',
    updated: false,
    isLoading: true,
    error2: false,
  });

  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('../api/auth/reset', {
          params: {
            resetPasswordToken: email_token,
          },
        });

        if (response.data.message === 'password reset link a-ok') {
          setPass({
            ...newPassword,
            email: response.data.email,
            updated: false,
            isLoading: false,
            error2: false,
          });
        }
      } catch (error) {
        setPass({
          ...newPassword,
          updated: false,
          isLoading: false,
          error2: true,
        });
      }
    };
    checkToken();
  }, [email_token]);

  const { password, password2 } = newPassword;

  const onChange = (e) =>
    setPass({ ...newPassword, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const resetPassword = async (payload) => {
      try {
        const resetResponse = await axios.put(
          '../api/auth/updatePasswordViaEmail',
          payload
        );

        if (resetResponse.data.token) {
          setPass({
            ...newPassword,
            updated: true,
            error2: false,
            token: resetResponse.data.token,
          });
          setAuthToken(resetResponse.data.token);
          loadUser();
        }
      } catch (error) {
        console.log(error.response.data);

        setPass({
          ...newPassword,
          updated: false,
          token: null,
          error2: true,
        });
      }
    };
    resetPassword(newPassword);
  };

  const classes = useStyles();

  const loadingPage = <Spinner />;

  const errorPage = <Typography>Error</Typography>;

  const formPage = (
    <form className={classes.root} onSubmit={onSubmit}>
      <div className={classes.text}>
        <Typography gutterBottom variant='h3'>
          Reset{' '}
          <Typography color='primary' variant='inherit'>
            Password
          </Typography>
        </Typography>
      </div>
      <Divider variant='middle' />
      <div>
        <Typography align={'center'}>Welcome {newPassword.email}</Typography>
        <Typography align={'center'}>Please Enter new Password</Typography>
      </div>

      <div>
        <TextField
          id='outlined-password-input'
          label='Password'
          type='password'
          variant='outlined'
          name='password'
          value={password}
          onChange={onChange}
          required={true}
          fullWidth
        />
      </div>
      <div>
        <TextField
          id='outlined-password-confirm'
          label='Confirm Password'
          type='password'
          variant='outlined'
          name='password2'
          value={password2}
          onChange={onChange}
          required={true}
          fullWidth
        />
      </div>
      <div>
        <Button variant='contained' color='primary' type='submit' fullWidth>
          Reset Password
        </Button>
      </div>
    </form>
  );
  if (newPassword.token) {
    return <Redirect to='/contacts' />;
  } else {
    return (
      <Grid container>
        <Grid item xs={false} sm={4} />
        <Grid item xs={12} sm={4}>
          {newPassword.isLoading
            ? loadingPage
            : newPassword.error2
            ? errorPage
            : formPage}
        </Grid>
        <Grid item xs={false} sm={4} />
      </Grid>
    );
  }
};

ResetPassword.propTypes = {
  error: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.users.error,
});

export default connect(mapStateToProps, { setAlert, clearErrors, loadUser })(
  ResetPassword
);

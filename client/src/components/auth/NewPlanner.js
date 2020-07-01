import React, { useState, useEffect, Fragment } from 'react';
import setAuthToken from '../../utils/setauthtoken';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
//import { loadUser, clearErrors } from '../../actions/userActions';
import { loadPlanner, clearErrors } from '../../actions/plannerActions';
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
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(20),
  },
}));

const ResetPassword = ({ error, setAlert, loadPlanner }) => {
  // Pull Token from URL
  let { email_token } = useParams();

  // Set initial state
  const [newPassword, setPass] = useState({
    email: '',
    password: '',
    password2: '',
    updated: false,
    isLoading: true,
    error2: false,
    error3: '',
  });

  // Check Token on load
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axios.get('../api/auth/resetPlanner', {
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
        setAlert(error.response.data, 'error');
      }
    };

    checkToken();
    // eslint-disable-next-line
  }, [email_token, setAlert]);

  const resetPassword = async (payload) => {
    try {
      const resetResponse = await axios.put(
        '../api/auth/updatePasswordViaEmail',
        payload
      );
      // If success set token to LS and load Planner
      if (resetResponse.data.token) {
        setPass({
          ...newPassword,
          updated: true,
          error2: false,
          token: resetResponse.data.token,
        });
        console.log(resetResponse.data.token);
        setAuthToken(resetResponse.data.token);
        loadPlanner();
      }
    } catch (error) {
      // console.log(error.response.data);
      //  If error load error page
      setPass({
        ...newPassword,
        updated: false,
        token: null,
        error2: true,
      });
      setAlert(error.response.data, 'error');
    }
  };

  const { password, password2, email } = newPassword;

  const onChange = (e) =>
    setPass({ ...newPassword, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'error');
    } else if (password.length < 6) {
      setAlert('Please enter a password with 6 or more characters', 'error');
    } else resetPassword({ email, password });
  };

  const classes = useStyles();

  const loadingPage = <Spinner />;

  const errorPage = <Redirect to='/' />;

  // Form page if token is correct
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
      <Fragment>
        <Container maxWidth='lg' className={classes.container}>
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
        </Container>
      </Fragment>
    );
  }
};

ResetPassword.propTypes = {
  error: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loadPlanner: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.planners.error,
});

export default connect(mapStateToProps, { setAlert, clearErrors, loadPlanner })(
  ResetPassword
);

import React, { useState, useEffect, Fragment } from 'react';
//import { forgotPass, clearErrors } from '../../actions/userActions';
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
import {
  forgotPass,
  clearErrors,
  setLoading,
} from '../../actions/plannerActions';
import { Container } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(20),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
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
  setLoading,
  loading,
}) => {
  useEffect(() => {
    if (error) {
      if (error.erros) {
        setAlert(error.errors[0].msg, 'error');
        clearErrors();
      }
    }
  }, [error, clearErrors, setAlert]);

  useEffect(() => {
    if (forgot) {
      setAlert('Reset Email Sent', 'success');
    }
    clearErrors();
  }, [forgot, clearErrors, setAlert]);

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
      setLoading();
      forgotPass({
        email,
      });
    }
  };

  const classes = useStyles();
  if (forgot) {
    return <Redirect to='/' />;
  } else if (isAdmin) {
    return <Redirect to='/admin' />;
  } else if (isAuthenticated) {
    return <Redirect to='/planner' />;
  } else {
    return (
      <Fragment>
        <Container maxWidth='lg' className={classes.container}>
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
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
        </Container>
      </Fragment>
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
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.planners.isAuthenticated,
  error: state.planners.error,
  isAdmin: state.planners.isAdmin,
  forgot: state.planners.forgot,
  loading: state.planners.formLoading,
});

export default connect(mapStateToProps, {
  forgotPass,
  clearErrors,
  setAlert,
  setLoading,
})(ForgotPass);

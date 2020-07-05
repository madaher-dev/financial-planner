import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { registerUser, clearErrors } from '../../actions/userActions';
import { registerPlanner, clearErrors } from '../../actions/plannerActions';
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(20),
  },
}));

const Register = ({
  registerPlanner,
  isAuthenticated,
  error,
  clearErrors,
  setAlert,
}) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    if (error) {
      if (error.errors[0].msg) {
        setAlert(error.errors[0].msg, 'error');
      } else console.log(error);

      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  const { name, email, password, password2 } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'error');
    } else registerPlanner(user);
  };

  const classes = useStyles();

  if (isAuthenticated) {
    return <Redirect to='/planner' />;
  } else {
    return (
      <Container maxWidth='lg' className={classes.container}>
        <Grid container>
          <Grid item xs={false} sm={4} />
          <Grid item xs={12} sm={4}>
            <form className={classes.root} onSubmit={onSubmit}>
              <div className={classes.text}>
                <Typography gutterBottom variant='h3'>
                  Register{' '}
                  <Typography color='primary' variant='inherit'>
                    Planner
                  </Typography>
                </Typography>
              </div>
              <Divider variant='middle' />
              <div>
                <TextField
                  id='outlined-name'
                  label='Name'
                  variant='outlined'
                  type='text'
                  name='name'
                  value={name}
                  onChange={onChange}
                  fullWidth
                  autoComplete='name'
                />
              </div>
              <div>
                <TextField
                  id='outlined-email'
                  label='Email Address'
                  variant='outlined'
                  autoComplete='email'
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
                <TextField
                  id='outlined-password-confirm'
                  label='Confirm Password'
                  type='password'
                  autoComplete='confirm-password'
                  variant='outlined'
                  name='password2'
                  value={password2}
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
                  Register
                </Button>
              </div>
            </form>
          </Grid>
          <Grid item xs={false} sm={4} />
        </Grid>
      </Container>
    );
  }
};

Register.propTypes = {
  registerPlanner: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  setAlert: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.planners.isAuthenticated,
  error: state.planners.error,
});

export default connect(mapStateToProps, {
  registerPlanner,
  clearErrors,
  setAlert,
})(Register);

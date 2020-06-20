import React, { useState, useEffect } from 'react';
import { setAlert } from '../../actions/alertActions';
import { loginUser, clearErrors } from '../../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Login = ({
  loginUser,
  isAuthenticated,
  error,
  clearErrors,
  setAlert,
}) => {
  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please entert your credentials', 'danger');
    } else {
      loginUser({
        email,
        password,
      });
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/contacts' />;
  } else {
    return (
      <div className='form-container'>
        <h1>
          Account <span className='text-primary'>Login</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
            />
          </div>

          <input
            type='submit'
            value='Login'
            className='btn btn-primary bton-block'
          />
        </form>
      </div>
    );
  }
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  error: state.users.error,
});

export default connect(mapStateToProps, {
  loginUser,
  clearErrors,
  setAlert,
})(Login);

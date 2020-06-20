import React, { useState, useEffect } from 'react';
import { setAlert } from '../../actions/alertActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser, clearErrors } from '../../actions/userActions';
import { Redirect } from 'react-router-dom';

const Register = ({
  registerUser,
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
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, setAlert, clearErrors]);

  const { name, email, password, password2 } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('Please entert all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser(user);
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/contacts' />;
  } else {
    return (
      <div className='form-container'>
        <h1>
          Account <span className='text-primary'>Register</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
              minLength='6'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              required
            />
          </div>
          <input
            type='submit'
            value='Register'
            className='btn btn-primary bton-block'
          />
        </form>
      </div>
    );
  }
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  error: state.users.error,
});

export default connect(mapStateToProps, {
  registerUser,
  clearErrors,
  setAlert,
})(Register);

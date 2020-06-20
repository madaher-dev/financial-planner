import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/userActions';

const Welcome = ({ loadUser }) => {
  if (localStorage.token) {
    loadUser();
  }
  return (
    <div>
      <h1>Welcome to Contact Keeper</h1>
      <p className='my-1'>
        This is a Full Stack React App for keeping contacts
      </p>
    </div>
  );
};
Welcome.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default connect(null, { loadUser })(Welcome);

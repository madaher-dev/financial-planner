import React from 'react';
import Spinner from '../layout/Spinner';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/userActions';

const AdminRoute = ({
  isAuthenticated,
  loading,
  loadUser,
  isAdmin,
  component: Component,
  ...rest
}) => {
  if (localStorage.token) {
    loadUser();
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : isAuthenticated && isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to='/contacts' />
        )
      }
    />
  );
};

AdminRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  isAdmin: state.users.isAdmin,
  loading: state.users.loading,
});

export default connect(mapStateToProps, { loadUser })(AdminRoute);

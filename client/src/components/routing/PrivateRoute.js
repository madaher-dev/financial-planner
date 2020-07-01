import React from 'react';
import Spinner from '../layout/Spinner';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { loadUser } from '../../actions/userActions';
import { loadPlanner } from '../../actions/plannerActions';
const PrivateRoute = ({
  isAuthenticated,
  loading,
  loadPlanner,
  component: Component,
  ...rest
}) => {
  if (localStorage.token && !isAuthenticated) {
    loadPlanner();
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && !loading ? (
          <Component {...props} />
        ) : isAuthenticated && loading ? (
          <Spinner />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  loadPlanner: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.planners.isAuthenticated,
  loading: state.planners.loading,
});

export default connect(mapStateToProps, { loadPlanner })(PrivateRoute);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { loadUser } from '../../actions/userActions';
import { loadPlanner } from '../../actions/plannerActions';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const Welcome = ({
  loadPlanner,
  isAuthenticated,

  isAdmin,
}) => {
  const classes = useStyles();

  if (localStorage.token) {
    loadPlanner();
  }
  if (isAdmin) {
    return <Redirect to='/admin' />;
  } else if (isAuthenticated) {
    return <Redirect to='/contacts' />;
  } else {
    return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <div>
            <h1>Welcome to Financial Planner</h1>
            <p className='my-1'>
              This is a Full Stack React App for financial planning
            </p>
          </div>
        </Container>
      </main>
    );
  }
};
Welcome.propTypes = {
  loadPlanner: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.planners.isAuthenticated,
  isAdmin: state.planners.isAdmin,
});

export default connect(mapStateToProps, { loadPlanner })(Welcome);

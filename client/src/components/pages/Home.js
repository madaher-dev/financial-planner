import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openDrawer } from '../../actions/plannerActions';
import Users from '../Users/Planners/Users';
import { Route, Switch } from 'react-router-dom';
import AuthDrawer from '../material/AuthDrawer';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import PlannerWelcome from '../layout/PlannerWelcome';
import Settings from '../Planners/SettingRO';
import Custom from '../Planners/SettingCustom';

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
  drawer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(20),
  },
}));

const Home = ({ match, openDrawer }) => {
  useEffect(() => {
    openDrawer();

    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  return (
    <Fragment>
      <AuthDrawer className={classes.drawer} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Switch>
            <Route exact path={`${match.path}/users`} component={Users} />
            <Route exact path={`${match.path}/settings`} component={Settings} />
            <Route
              exact
              path={`${match.path}/customsettings`}
              component={Custom}
            />
            <Route exact path={`${match.path}/`} component={PlannerWelcome} />
          </Switch>
        </Container>
      </main>
    </Fragment>
  );
};
Home.propTypes = {
  openDrawer: PropTypes.func.isRequired,
};

export default connect(null, { openDrawer })(Home);

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import { logout, openDrawer } from '../../actions/userActions';
import { clearContacts } from '../../actions/contactActions';
import { logout, openDrawer } from '../../actions/plannerActions';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';

import TopMenuNoAuth from './TopMenuNoAuth';
import TopMenuAuth from './TopMenuAuth';
import TopMenuAdmin from './TopMenuAdmin';
import { Typography, Grid, IconButton } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > .fa': {
      margin: theme.spacing(2),
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },

  icon: {
    paddingRight: 5,
    color: 'white',
  },
  links: {
    color: 'white',
    textDecoration: 'none',
  },
  authMenu: {
    flexGrow: 1,
  },
  notifications: {
    paddingTop: 10,
    paddingRight: 10,
  },
}));

const Navbar = ({
  logout,
  user,
  open,
  isAuthenticated,
  isAdmin,
  clearContacts,
  openDrawer,
}) => {
  const classes = useStyles();

  const onLogout = () => {
    logout();
    clearContacts();
  };
  function useWindowSize() {
    const isClient = typeof window === 'object';

    function getSize() {
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined,
      };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
      if (!isClient) {
        return false;
      }

      function handleResize() {
        setWindowSize(getSize());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
      // eslint-disable-next-line
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
  }
  const size = useWindowSize();

  const authLinks = (
    <Grid container>
      <Grid item xs={3}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={openDrawer}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
            to='/'
            component={Link}
          >
            <MenuIcon />
          </IconButton>
          <IconButton to='/' component={Link}>
            <AccountBalanceIcon className={classes.icon} />
          </IconButton>

          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.links}
            to='/'
            component={Link}
          >
            Financial Planner
          </Typography>
        </Toolbar>
      </Grid>
      <Grid item className={classes.authMenu}>
        {size.width > 600 ? (
          isAdmin ? (
            <TopMenuAdmin />
          ) : (
            <TopMenuAuth />
          )
        ) : (
          <Fragment></Fragment>
        )}
      </Grid>
      <Grid item></Grid>
      <Grid item className={classes.notifications}>
        <Typography
          color='inherit'
          noWrap
          className={classes.links}
          to='/admin/planners'
          component={Link}
        >
          Hello {user && user.name}
        </Typography>
        <IconButton
          onClick={onLogout}
          to='/login'
          component={Link}
          color='inherit'
        >
          <ExitToAppIcon />
        </IconButton>
        <IconButton color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Grid>
    </Grid>
  );
  const guestLinks = (
    <Grid container>
      <Grid item xs={3}>
        <Toolbar className={classes.toolbar}>
          <IconButton to='/' component={Link}>
            <AccountBalanceIcon className={classes.icon} />
          </IconButton>

          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.links}
            to='/'
            component={Link}
          >
            Financial Planner
          </Typography>
        </Toolbar>
      </Grid>
      <Grid item>
        <TopMenuNoAuth />
      </Grid>
    </Grid>
  );

  return (
    <AppBar
      position='absolute'
      className={clsx(classes.appBar, open && classes.appBarShift)}
      color='primary'
    >
      {isAuthenticated && user ? authLinks : guestLinks}
    </AppBar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  clearContacts: PropTypes.func.isRequired,
  openDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.planners.isAuthenticated,
  isAdmin: state.planners.isAdmin,
  open: state.planners.open,
  user: state.planners.user,
});
export default connect(mapStateToProps, { logout, clearContacts, openDrawer })(
  Navbar
);

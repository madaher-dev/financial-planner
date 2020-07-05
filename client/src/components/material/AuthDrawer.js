import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
//import { closeDrawer } from '../../actions/userActions';
import { closeDrawer } from '../../actions/plannerActions';
import { connect } from 'react-redux';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { IconButton, Divider, List } from '@material-ui/core';
import { mainListItems, secondaryListItems } from './listItems';

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
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginBottom: 100,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const AuthDrawer = ({ closeDrawer, open, isAuthenticated, isAdmin }) => {
  React.useEffect(() => {
    return () => closeDrawer();
  }, [closeDrawer]);

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
  useEffect(() => {
    if (size.width < 600) {
      closeDrawer();
    }
  }, [size.width, closeDrawer]);

  const classes = useStyles();
  const guestDrawer = <Fragment></Fragment>;
  const adminDrawer = (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems}</List>
    </Drawer>
  );
  const authDrawer = (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={closeDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
    </Drawer>
  );

  return (
    <Fragment>
      {isAdmin ? adminDrawer : isAuthenticated ? authDrawer : guestDrawer}
    </Fragment>
  );
};

AuthDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  closeDrawer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.planners.isAuthenticated,
  isAdmin: state.planners.isAdmin,
  open: state.planners.open,
});
export default connect(mapStateToProps, { closeDrawer })(AuthDrawer);

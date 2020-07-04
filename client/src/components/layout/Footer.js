import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1,

    //paddingTop: theme.spacing(10),
    // marginTop: theme.spacing(10),
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position='fixed' color='primary' className={classes.appBar}>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='open drawer'>
            <MenuIcon />
          </IconButton>
          <Typography variant='body2' color='inherit' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://material-ui.com/'>
              Financial Planner
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
          <div className={classes.grow} />
          <IconButton color='inherit'>
            <SearchIcon />
          </IconButton>
          <IconButton edge='end' color='inherit'>
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

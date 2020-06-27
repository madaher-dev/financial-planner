import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab } from '@material-ui/core';

import { Link } from 'react-router-dom';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 1),

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export default function TopMenuNoAuth() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label='simple tabs example'
      indicatorColor='primary'
      className={classes.root}
    >
      <Tab label='About' {...a11yProps(0)} to='/about' component={Link} />
      <Tab label='Register' {...a11yProps(1)} to='/register' component={Link} />
      <Tab label='Login' {...a11yProps(2)} to='/login' component={Link} />
    </Tabs>
  );
}

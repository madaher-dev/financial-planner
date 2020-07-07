import React from 'react';
import Charts from './Charts';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Details = ({ rowData }) => {
  const { fullName } = rowData;

  return (
    <div>
      <Typography>{fullName}</Typography>
      <Charts />
    </div>
  );
};
Details.propTypes = {
  rowData: PropTypes.object.isRequired,
};
export default Details;

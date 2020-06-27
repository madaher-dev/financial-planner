import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPlanners } from '../../actions/userActions';

const Admin = ({ getPlanners }) => {
  useEffect(() => {
    getPlanners();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <p className='my-1'>This is the admin page</p>
      <p className='bg-dark p'>
        <strong>Version </strong> 1.0.0
      </p>
    </div>
  );
};
Admin.propTypes = {
  getPlanners: PropTypes.func.isRequired,
};

export default connect(null, { getPlanners })(Admin);

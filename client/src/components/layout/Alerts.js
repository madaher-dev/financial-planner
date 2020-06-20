import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Alerts = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'> {alert.msg}</i>
      </div>
    ))
  );
};

Alerts.propTypes = {
  alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, {})(Alerts);

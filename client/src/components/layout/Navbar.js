import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import { clearContacts } from '../../actions/contactActions';
import { connect } from 'react-redux';

const Navbar = ({
  title,
  icon,
  logout,
  user,
  isAuthenticated,
  clearContacts,
}) => {
  const onLogout = () => {
    logout();
    clearContacts();
  };
  const authLinks = (
    <Fragment>
      <li>
        {' '}
        <Link to='/contacts'>Hello {user && user.name}</Link>
      </li>

      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <a onClick={onLogout} href='/login'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/welcome'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  clearContacts: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user,
});
export default connect(mapStateToProps, { logout, clearContacts })(Navbar);

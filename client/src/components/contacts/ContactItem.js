import React from 'react';
// import {
//   useContacts,
//   deleteContact,
//   setCurrent,
//   clearCurrent,
// } from '../../context/contact/ContactState';

import {
  deleteContact,
  setCurrent,
  clearCurrent,
} from '../../actions/contactActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ContactItem = ({ contact, deleteContact, setCurrent, clearCurrent }) => {
  // getting context to edit and delete

  // we just need the contact dispatch without state.
  //const contactDispatch = useContacts()[1];
  // Pull out what you need from contact by destructuring
  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'business' ? 'badge-success' : 'badge-primary')
          }
        >
          {/*Making first letter Caps */}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'> {email}</i>
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'> {phone}</i>
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contacts: PropTypes.array.isRequired,
  filtered: PropTypes.array,
  loading: PropTypes.bool,
  contact: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  filtered: state.contacts.filtered,
  loading: state.contacts.loading,
});

export default connect(mapStateToProps, {
  deleteContact,
  setCurrent,
  clearCurrent,
})(ContactItem);

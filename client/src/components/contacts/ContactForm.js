import React, { useState, useEffect } from 'react';
import {
  addContact,
  updateContact,
  clearCurrent,
} from '../../actions/contactActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ContactForm = ({ addContact, updateContact, clearCurrent, current }) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    //will take whatever is in the state ... and name: name
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    } else {
      updateContact(contact);
    }
    clearAll();
  };
  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Tyoe</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='business'
        checked={type === 'business'}
        onChange={onChange}
      />{' '}
      Business
      <div>
        <input
          type='submit'
          value={current ? 'Edit Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button
            type='text'
            className='btn btn-light btn-block'
            onClick={clearAll}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.contacts.current,
});

export default connect(mapStateToProps, {
  addContact,
  updateContact,
  clearCurrent,
})(ContactForm);

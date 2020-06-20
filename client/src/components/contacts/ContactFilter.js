import React, { useRef } from 'react';
import { filterContacts, clearFilter } from '../../actions/contactActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ContactFilter = ({ filterContacts, clearFilter }) => {
  const text = useRef('');
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type='text'
        ref={text}
        placeholder='Filter Contacts'
        onChange={onChange}
      />
    </form>
  );
};

ContactFilter.propTypes = {
  filterContacts: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

export default connect(null, {
  filterContacts,
  clearFilter,
})(ContactFilter);

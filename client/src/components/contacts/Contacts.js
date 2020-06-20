import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

import { getContacts } from '../../actions/contactActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Contacts = ({ contacts, filtered, loading, getContacts }) => {
  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Pleasee add a Contact</h4>;
  }
  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                //Looping through filtered contacts array and list ContactItem Component
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                //Looping through contacts array and list ContactItem Component
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

Contacts.propTypes = {
  getContacts: PropTypes.func.isRequired,
  contacts: PropTypes.array,
  filtered: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  contacts: state.contacts.contacts,
  filtered: state.contacts.filtered,
  loading: state.contacts.loading,
});

export default connect(mapStateToProps, { getContacts })(Contacts);

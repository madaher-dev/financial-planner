import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
const Contacts = () => {
  // To have access to any states or method or actions in contactContext ex: array contacts
  const contactContext = useContext(ContactContext);

  // Pulling array contacts
  const { contacts, filtered } = contactContext;
  if (contacts.length === 0) {
    return <h4>Pleasee add a Contact</h4>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              //Looping through filtered contacts array and list ContactItem Component
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              //Looping through contacts array and list ContactItem Component
              <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};
export default Contacts;

import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import AlertContext from '../alert/alertContext';
import alertReducer from '../alert/alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../Types';

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    // inside value put anything you want to access from other components including state and actions
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;

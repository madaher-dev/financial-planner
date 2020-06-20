import { combineReducers } from 'redux';
import userReducer from './userReducer';
import contactReducer from './contactReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  users: userReducer,
  contacts: contactReducer,
  alerts: alertReducer,
});

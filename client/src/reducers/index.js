import { combineReducers } from 'redux';
import userReducer from './userReducer';
import plannerReducer from './plannerReducer';
import contactReducer from './contactReducer';
import alertReducer from './alertReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
  //users: userReducer,
  planners: plannerReducer,
  contacts: contactReducer,
  alerts: alertReducer,
  settings: settingsReducer,
  users: userReducer,
});

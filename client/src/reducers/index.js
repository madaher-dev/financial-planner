import { combineReducers } from 'redux';
//import userReducer from './userReducer';
import plannerReducer from './plannerReducer';
import contactReducer from './contactReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  //users: userReducer,
  planners: plannerReducer,
  contacts: contactReducer,
  alerts: alertReducer,
});

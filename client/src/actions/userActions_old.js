import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  IS_ADMIN,
  FORGOT_FAIL,
  FORGOT,
  GET_PLANNERS,
  PLANNER_ERROR,
  ADMIN_LOADED,
} from './Types';
import axios from 'axios';

// Register User

export const registerUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/users', user, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, //Token
    });
    //  dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data,
    });
  }
};

// Login User

export const loginUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', user, config);
    //returns token + admin (user type)
    if (res.data.admin) {
      dispatch({
        type: IS_ADMIN,
        payload: res.data.token, //Token
      });
      // dispatch(loadUser());
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token, //Token
      });
      // dispatch(loadUser());
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data,
    });
  }
};

// Forgot Password

export const forgotPass = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put('/api/auth/forgot', user, config);

    dispatch({
      type: FORGOT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FORGOT_FAIL,
      payload: err.response.data,
    });
  }
};

// Load User

export const loadUser = () => async (dispatch) => {
  try {
    const res1 = await axios.get('/api/auth');

    if (res1.data.admin) {
      dispatch({
        type: ADMIN_LOADED,
        payload: res1.data,
      });
    } else {
      dispatch({
        type: USER_LOADED,
        payload: res1.data,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
  }
};

// Get Planners
export const getPlanners = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/palnners');
    dispatch({ type: GET_PLANNERS, payload: res.data });
  } catch (err) {
    dispatch({ type: PLANNER_ERROR, payload: err.response.data });
  }
};

// // load user on first run or refresh
// if (loading) {
//   loadUser();
// }

// Logout

export const logout = () => ({ type: LOGOUT });

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });

// Open Drawer
export const openDrawer = () => ({ type: OPEN_DRAWER });

// Close Drawer
export const closeDrawer = () => ({ type: CLOSE_DRAWER });

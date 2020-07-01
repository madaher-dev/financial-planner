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
  ADD_SUCCESS,
  ADD_FAIL,
  CLEAR_ADD,
  EDIT_SUCCESS,
  EDIT_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  SET_LOADING,
} from './Types';
import axios from 'axios';

// Register Planner

export const registerPlanner = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/planners', user, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, //Token
    });
    dispatch(loadPlanner());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data,
    });
  }
};

// Addning New Planner by admin

export const addPlanner = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  var generator = require('generate-password');

  var password = generator.generate({
    length: 10,
    numbers: true,
  });
  user.password = password;

  try {
    await axios.post('/api/planners', user, config);
    await axios.put('/api/auth/sendMail', user, config);

    dispatch({
      type: ADD_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: ADD_FAIL,
      payload: err.response.data,
    });
  }
};

// Edit Planner

export const editPlanner = (planner) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/planners/edit', planner, config);

    dispatch({
      type: EDIT_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: EDIT_FAIL,
      payload: err.response.data,
    });
  }
};

// Login User

export const loginPlanner = (user) => async (dispatch) => {
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
      dispatch(loadPlanner());
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token, //Token
      });
      dispatch(loadPlanner());
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

// Load Planner

export const loadPlanner = () => async (dispatch) => {
  try {
    const res1 = await axios.get('/api/auth');

    if (res1.data.admin) {
      dispatch({
        type: ADMIN_LOADED,
        payload: res1.data.user,
      });
    } else {
      dispatch({
        type: USER_LOADED,
        payload: res1.data.user,
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
    const res = await axios.get('/api/planners/sub');
    dispatch({ type: GET_PLANNERS, payload: res.data });
  } catch (err) {
    dispatch({ type: PLANNER_ERROR, payload: err.response.data });
  }
};

// Delete Planner
export const deletePlanner = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/planners/${id}`);
    dispatch({ type: DELETE_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_FAIL, payload: err.response.msg });
  }
};

export const logout = () => ({ type: LOGOUT });

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });
// Clear Add
export const clearAdd = () => ({ type: CLEAR_ADD });

// Open Drawer
export const openDrawer = () => ({ type: OPEN_DRAWER });

// Close Drawer
export const closeDrawer = () => ({ type: CLOSE_DRAWER });

// Set Loading
export const setLoading = () => ({ type: SET_LOADING });

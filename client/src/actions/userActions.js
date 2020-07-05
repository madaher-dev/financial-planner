import {
  CLEAR_ERRORS,
  USER_ERROR,
  ADD_SUCCESS,
  ADD_FAIL,
  CLEAR_ADD,
  EDIT_SUCCESS,
  EDIT_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  SET_LOADING,
  GET_USERS,
} from './Types';
import axios from 'axios';

// Addning New User by Planner or Admin

export const addUser = (user) => async (dispatch) => {
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
    await axios.post('/api/users/add', user, config);
    await axios.put('/api/auth/userSendMail', user, config);

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

// Edit User

export const editUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    await axios.post('/api/users/edit', user, config);

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

// Get all users for admin
export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/all');
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data });
  }
};

// Get all users for specific planner
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/sub');
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err.response.data });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/${id}`);
    dispatch({ type: DELETE_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_FAIL, payload: err.response.msg });
  }
};

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS });
// Clear Add
export const clearAdd = () => ({ type: CLEAR_ADD });

// Set Loading
export const setLoading = () => ({ type: SET_LOADING });

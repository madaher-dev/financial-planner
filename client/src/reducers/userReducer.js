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
} from '../actions/Types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
  open: false,
  isAdmin: null,
  forgot: false,
  planners: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        open: true,
        error: null,
        isAdmin: false,
        forgot: false,
      };
    case IS_ADMIN:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        open: true,
        error: null,
        isAdmin: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
        isAdmin: false,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
        isAdmin: true,
        open: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case FORGOT_FAIL:
    case PLANNER_ERROR:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
        open: false,
        isAdmin: false,
        forgot: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        forgot: false,
      };
    case OPEN_DRAWER:
      return {
        ...state,
        open: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        open: false,
      };
    case FORGOT:
      return {
        ...state,
        forgot: true,
      };
    case GET_PLANNERS:
      return {
        ...state,
        planners: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

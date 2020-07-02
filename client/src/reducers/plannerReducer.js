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
  planners: [],
  add: false,
  edit: false,
  delete: false,
  plannerLoaded: false,
  formLoading: false,
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
        open: true,
        formLoading: false,
        token: localStorage.getItem('token'),
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
        formLoading: false,
        token: localStorage.getItem('token'),
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
        formLoading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        forgot: false,
        add: false,
        edit: false,
        delete: false,
        loading: false,
        formLoading: false,
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
        formLoading: false,
      };
    case GET_PLANNERS:
      return {
        ...state,
        planners: action.payload,
        loading: false,
        plannerLoaded: true,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        add: true,
        error: null,
        formLoading: false,
      };
    case ADD_FAIL:
      return {
        ...state,
        error: action.payload,
        add: false,
        formLoading: false,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        edit: true,
        error: null,
        formLoading: false,
      };
    case EDIT_FAIL:
      return {
        ...state,
        error: action.payload,
        edit: false,
        formLoading: false,
      };
    case DELETE_SUCCESS:
      return {
        ...state,

        error: null,
        delete: true,
        formLoading: false,
      };
    case DELETE_FAIL:
      return {
        ...state,
        error: action.payload,

        delete: false,
        formLoading: false,
      };
    case CLEAR_ADD:
      return {
        ...state,
        add: false,
        formLoading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        formLoading: true,
      };
    default:
      return state;
  }
};

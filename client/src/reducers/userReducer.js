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
} from '../actions/Types';

const initialState = {
  users: [],
  error: null,
  add: false,
  edit: false,
  delete: false,
  userLoaded: false,
  formLoading: false,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        formLoading: false,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        add: false,
        edit: false,
        delete: false,
        formLoading: false,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,

        userLoaded: true,
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

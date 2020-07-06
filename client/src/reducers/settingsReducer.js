import {
  GET_SETTINGS,
  UPDATE_SETTINGS,
  SETTINGS_ERROR,
  SET_LOADING,
  CLEAR_SETTINGS,
} from '../actions/Types';

const initialState = {
  settings: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        settings: action.payload,
        loading: false,
        error: null,
      };
    case SETTINGS_ERROR:
    case CLEAR_SETTINGS:
      return {
        ...state,
        loading: false,
        error: action.payload,
        settings: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

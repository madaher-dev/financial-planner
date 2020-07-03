import axios from 'axios';
import {
  GET_SETTINGS,
  UPDATE_SETTINGS,
  SETTINGS_ERROR,
  SET_LOADING,
} from '../actions/Types';

// Get Settings
export const getSettings = () => async (dispatch) => {
  try {
    const settings = await axios.get('/api/settings/');
    dispatch({ type: GET_SETTINGS, payload: settings.data });
  } catch (err) {
    dispatch({ type: SETTINGS_ERROR, payload: err.response.msg });
  }
};

// Save Settings

export const saveSettings = (updated) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const settings = await axios.put('/api/settings/edit', updated, config);
    dispatch({ type: UPDATE_SETTINGS, payload: settings.data });
  } catch (err) {
    dispatch({ type: SETTINGS_ERROR, payload: err.response.msg });
  }
};

// Set Loading
export const setLoading = () => ({ type: SET_LOADING });

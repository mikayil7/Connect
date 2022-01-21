import {
  AUTH_LOADING,
  LOG_IN_STATUS_SUCCESS,
  LOG_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  FB_LOGIN_SUCCESS,
  AUTH_ERROR,
} from '../actions/AuthActions';

const initState = {
  user: null,
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOG_IN_STATUS_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GOOGLE_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case FB_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

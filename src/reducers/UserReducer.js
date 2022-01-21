import {
  USER_LOADING,
  USER_SUCCESS,
  USER_DOES_NOT_EXIST,
  REMOVE_USER,
  USER_ERROR,
} from '../actions/UserActions';

const initState = {
  data: {},
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case USER_DOES_NOT_EXIST:
      return {
        ...state,
        loading: false,
      };
    case REMOVE_USER:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

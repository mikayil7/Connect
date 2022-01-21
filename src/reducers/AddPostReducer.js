import {
  POST_LOADING,
  POST_SUCCESS,
  POST_ERROR,
} from '../actions/AddPostActions';

const initState = {
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

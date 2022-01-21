import {
  SELF_POSTS_LOADING,
  SELF_POSTS_SUCCESS,
  SELF_POSTS_ERROR,
} from '../actions/SelfPostsAction';

const initState = {
  posts: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SELF_POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SELF_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case SELF_POSTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

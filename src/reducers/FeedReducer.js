import {
  POSTS_LOADING,
  POSTS_SUCCESS,
  POSTS_ERROR,
  DELETE_POST_LOADING,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
} from '../actions/FeedActions';

const initState = {
  posts: [],
  loading: false,
  deleted: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        deleted: false,
        loading: false,
      };
    case POSTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case DELETE_POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        deleted: true,
      };
    case DELETE_POST_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

import { combineReducers } from 'redux';
import FeedReducer from './FeedReducer';
import AddPostReducer from './AddPostReducer';
import SelfPostsReducer from './SelfPostsReducer';
import UserReducer from './UserReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  feed: FeedReducer,
  selfposts: SelfPostsReducer,
  userProfile: UserReducer,
  addPost: AddPostReducer,
  auth: AuthReducer,
});

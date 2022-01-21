import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { uploadImage } from '../utils/UploadImage';

export const POST_LOADING = 'POST_LOADING';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_ERROR = 'POST_ERROR';

export const submitPost = (user, post, image) => async dispatch => {
  dispatch({
    type: POST_LOADING,
  });

  const imageUrl = await uploadImage(image);

  firestore()
    .collection('posts')
    .add({
      userId: user.uid,
      userName: user.displayName,
      userImg: user.photoURL ? user.photoURL : null,
      post: post,
      postImg: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        'Post published!',
        'Your post has been published Successfully!',
      );
      dispatch({
        type: POST_SUCCESS,
      });
    })
    .catch(error => {
      console.log('Something went wrong with added post to firestore.', error);
      dispatch({
        type: POST_ERROR,
      });
    });
};

import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { uploadImage } from '../utils/UploadImage';

export const USER_LOADING = 'USER_LOADING';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_DOES_NOT_EXIST = 'USER_DOES_NOT_EXIST';
export const USER_ERROR = 'USER_ERROR';

export const getUser = (route, user) => dispatch => {
  dispatch({
    type: USER_LOADING,
  });
  firestore()
    .collection('users')
    .doc(route.params ? route.params.userId : user.uid)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        return dispatch({
          type: USER_SUCCESS,
          payload: documentSnapshot.data(),
        });
      }
      dispatch({
        type: USER_DOES_NOT_EXIST,
      });
    })
    .catch(error => {
      dispatch({
        type: USER_ERROR,
        payload: error,
      });
    });
};

export const handleUpdate = async (userUid, userData, image) => {
  try {
    let imgUrl = await uploadImage(image);

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('users')
      .doc(userUid)
      .set({
        about: userData.about,
        phone: userData.phone,
        country: userData.country,
        city: userData.city,
        userImg: imgUrl,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });

    await auth().currentUser.updateProfile({ photoURL: imgUrl });
  } catch (err) {
    console.log('ERROR', err);
  }
};

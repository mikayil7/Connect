import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_ERROR = 'AUTH_ERROR';

export const LOG_IN_STATUS_SUCCESS = 'LOG_IN_STATUS_SUCCESS';

export const loginStatus = user => dispatch => {
  try {
    dispatch({
      type: LOG_IN_STATUS_SUCCESS,
      payload: user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: AUTH_LOADING,
    });
    const user = await auth().signInWithEmailAndPassword(email, password);

    dispatch({
      type: LOG_IN_SUCCESS,
      payload: user.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({
      type: AUTH_LOADING,
    });
    const userCredentials = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    if (userCredentials.user) {
      await userCredentials.user.updateProfile({
        displayName: name,
      });
      await userCredentials.user.reload();
      const user = auth().currentUser;
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: user,
      });
    }
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS';

export const googleLogin = () => async dispatch => {
  try {
    dispatch({
      type: AUTH_LOADING,
    });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user = await auth().signInWithCredential(googleCredential);
    dispatch({
      type: GOOGLE_LOGIN_SUCCESS,
      payload: user.user,
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const FB_LOGIN_SUCCESS = 'FB_LOGIN_SUCCESS';

export const fbLogin = () => async dispatch => {
  try {
    dispatch({
      type: AUTH_LOADING,
    });
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    const user = await auth().signInWithCredential(facebookCredential);

    dispatch({
      type: FB_LOGIN_SUCCESS,
      payload: user.user,
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({
      type: AUTH_LOADING,
    });
    await auth().signOut();
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
      payload: e,
    });
  }
};

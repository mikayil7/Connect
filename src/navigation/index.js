import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { Loading } from '../components/Loading';
import { loginStatus as loginStatusAction } from '../actions/AuthActions';

const Routes = ({ loginStatus }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = user => {
    setUser(user);
    loginStatus(user);
    if (loading) setLoading(false);
  };

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (loading) return <Loading size={8} />;

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  loginStatus: loginStatusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

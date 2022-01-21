import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FormButton } from '../components';
import { connect } from 'react-redux';
import { logout } from '../actions/AuthActions';

const MessagesScreen = ({ user, logout }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome {user.uid}</Text>
      <FormButton buttonTitle="Log Out" onPress={logout} />
    </View>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

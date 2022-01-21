import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { totalSize } from '../utils/Dimentions';

const FormInput = ({ iconType, error, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.iconStyle}>
          <Icon name={iconType} size={25} color="#666" />
        </View>
        <TextInput style={styles.input} placeholderTextColor="#ccc" {...rest} />
      </View>

      {error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  );
};

export { FormInput };

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: totalSize(1),
    marginBottom: totalSize(2),
    width: '100%',
    height: '9%',
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    marginTop: totalSize(0.7),
    fontSize: totalSize(1.8),
    alignSelf: 'flex-start',
  },
});

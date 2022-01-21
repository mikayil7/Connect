import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';

import { submitPost } from '../actions/AddPostActions';
import { Loading } from '../components/Loading';

import {
  InputWrapper,
  InputField,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';

const AddPostScreen = ({ loading, submitPost, user }) => {
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(null);

  const takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const submit = () => {
    submitPost(user, post, image);
    setImage(null);
    setPost(null);
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container}>
      <InputWrapper>
        {image !== null ? <AddImage source={{ uri: image }} /> : null}
        <InputField
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={setPost}
        />
        {loading ? (
          <StatusWrapper>
            <Loading size={5} />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={submit}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      </InputWrapper>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Library"
          onPress={takePhotoFromLibrary}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Take Photo"
          onPress={takePhoto}>
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({ addPost, auth }) => ({
  loading: addPost.loading,
  user: auth.user,
});

const mapDispatchToProps = {
  submitPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPostScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

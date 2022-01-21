import storage from '@react-native-firebase/storage';

export const uploadImage = async image => {
  if (image === null) {
    return null;
  }

  let fileName = image.substring(image.lastIndexOf('/') + 1);

  const extension = fileName.split('.').pop();
  const name = fileName.split('.').slice(0, -1).join('.');
  fileName = `${name}${Date.now()}.${extension}`;

  const storageRef = storage().ref(`photos/${fileName}`);
  const task = storageRef.putFile(image);

  task.on('state_changed', taskSnapshot => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );
  });

  try {
    await task;
    const url = await storageRef.getDownloadURL();

    return url;
  } catch (e) {
    console.log(e);
    return null;
  }
};

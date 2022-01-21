import React, { useEffect } from 'react';
import { FlatList, Alert, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../styles/FeedStyles';
import { PostCard, ShimmerEffect } from '../components';
import { getPosts, deletePost } from '../actions/FeedActions';

const FeedScreen = ({
  navigation,
  getPosts,
  deletePost,
  posts,
  loading,
  deleted,
  user,
}) => {
  useEffect(() => {
    getPosts();
  }, [deleted]);

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ShimmerEffect />
      ) : (
        <Container>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostCard
                item={item}
                user={user}
                onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate('Profile', { userId: item.userId })
                }
              />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onRefresh={getPosts}
            refreshing={loading}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = ({ feed, auth }) => ({
  posts: feed.posts,
  loading: feed.loading,
  deleted: feed.deleted,
  user: auth.user,
});

const mapDispatchToProps = {
  getPosts,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);

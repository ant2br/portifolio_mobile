import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PostCard = ({ post }) => {
    const navigation = useNavigation();
  
    const handlePress = () => {
      navigation.navigate('Post', { post });
    };
  
  return (
    <TouchableOpacity onPress={handlePress}>
    <View style={styles.cardContainer}>
      <Image source={{ uri: post.featured_image_url }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{post.title}</Text>
        <Text style={styles.cardDescription}>{post.description}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#1E253E',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: "#63E2B4"
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardInfo: {
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  cardDescription: {
    marginTop: 5,
    color: 'white',
  },
});

export default PostCard;

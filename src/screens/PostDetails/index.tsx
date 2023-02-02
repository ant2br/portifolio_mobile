import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PostDetails = ({ route }) => {
const navigation = useNavigation();
const post = route.params.post;
return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Image source={{ uri: post.featured_image_url }} style={styles.cardImage} />
        <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{post.title}</Text>
            <Text style={styles.cardDescription}>{post.description}</Text>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
container: {
backgroundColor: '#11172B',
flex: 1,
padding: 10,
},
backButton: {
marginTop: 40,
marginLeft: 10,
},
backButtonText: {
fontSize: 16,
color: 'white',
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

export default PostDetails;
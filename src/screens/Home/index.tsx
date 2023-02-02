import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Alert, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import PostCard from '../../components/PostCard';
import api from '../../utils/axiosConfig'


interface Post {
    id: string;
    title: string;
    content: string;
    image: string;
    description: string;
}

const HomeScreen = () => {
    const navigation = useNavigation();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');

            if(!token) {
                return;
            }

            const response = await api.get(`/posts?page=${page}`);

            console.log(response)

            if(response.data.posts.length == 0) {
                Alert.alert('No more posts to show.');
                return;
            }


            setPosts([...posts, ...response.data.posts]);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const handleRefresh = () => {
        fetchPosts();
    }

    const handleEndReached = () => {
      setPage(page + 1);
      fetchPosts();
      }

    const ItemSeparator = () => <View style={{ marginVertical: 10 }} />;

    return (
        <View style={[{backgroundColor: '#11172B'}]}>

        {posts.length == 0 && 
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>No posts found.</Text>
                    </View>
                }

            <FlatList
                data={posts}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => <PostCard post={item} />}
                showsVerticalScrollIndicator={true}
                ItemSeparatorComponent={ItemSeparator}
                style={{ transform: [{ scale: 0.95 }] }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
                }
            />
            {loading && <ActivityIndicator size="large" />}
        </View>
    );

    
};

const styles = StyleSheet.create({
  errorContainer: {
  alignItems: 'center',
  padding: 20,
  },
  errorText: {
  color: '#fff',
  fontSize: 18,
  },
  });

export default HomeScreen;

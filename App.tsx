import React, { useEffect, useState } from 'react';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


import LoginScreen from './src/screens/Login/index';
import RegisterScreen from './src/screens/Register/index';
import HomeScreen from './src/screens/Home/index';
import PostDetails from './src/screens/PostDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Auth = ({ children }) => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          // Send the token to the backend for verification
          const response = await axios.post('https://brener.dev/api/verify-token', {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            setIsLoggedIn(true);
          } else {
            try {
              console.log("entrei")
              const refreshToken = await AsyncStorage.getItem('refreshToken');
              // Send the refresh token to the backend for refreshing the token
              const response = await axios.post('https://brener.dev/api/refresh-token',{"token": refreshToken},{headers: {'Authorization': `Bearer ${token}`}});

              console.log("erro" + response.data.error)
              if (response.status === 200) {
                // Save the new token
                await AsyncStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
              } else {
                setIsLoggedIn(false);
                navigation.navigate('Login');
              }
            } catch (err) {
              // Invalid refresh token
              setIsLoggedIn(false);
              navigation.navigate('Login');
            }
          }
        } catch (err) {
          // Invalid token
          setIsLoggedIn(false);
          navigation.navigate('Login');
        }
      } else {
        setIsLoggedIn(false);
        navigation.navigate('Login');
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('MainTab');
    }
  }, [isLoggedIn]);

  return children;
};

const MainTab = () => {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};


const App = () => {
  return (
<NavigationContainer>
  <Auth>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }}/>
      <Stack.Screen name="Post" component={PostDetails} options={{ headerShown: false }}/>

    </Stack.Navigator>
    
  </Auth>
</NavigationContainer>


  );
};

export default App;

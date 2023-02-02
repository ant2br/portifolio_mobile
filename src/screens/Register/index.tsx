import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        Keyboard.dismiss();

        if(!username || !email || !password) {
            return Alert.alert('Error', 'Please fill all fields');
        }
        
        try {
            setLoading(true);
            const response = await axios.post('http://brener.dev/api/register', {
                "username": username,
                "email": email,
                "password": password
            });
            setLoading(false);
    
            Alert.alert('Success', response.data.message);
            navigation.navigate('Login');
        } catch (err:any) {
            setLoading(false);
            Alert.alert('Error', err.response.data.message);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: '#11172B' }]}>
            <Text style={[styles.label, { color: '#65E8B8' }]}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={text => setUsername(text)}
            />

            <Text style={[styles.label, { color: '#65E8B8' }]}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
                />
                        <Text style={[styles.label, { color: '#65E8B8' }]}>Password</Text>
        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />

<TouchableOpacity 
            onPress={() => setSecureTextEntry(!secureTextEntry)} 
            style={styles.eyeButton}
        >
            <MaterialIcons 
            name={secureTextEntry ? 'visibility' : 'visibility-off'} 
            size={24} 
            color="#65E8B8" 
            style={styles.eyeIcon}
            />
        </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#5AD0A5' }]} onPress={handleSubmit}>
        {loading ? (
                <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Register</Text>
                )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: '#65E8B8' }]}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginButton, { color: '#5AD0A5' }]}>Logar-se</Text>
</TouchableOpacity>
</View>
        
    </View>
);
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
    },
    label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#C4C4C4',
    },
    input: {
    height: 50,
    width: '100%',
    backgroundColor: '#1E253E',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    padding: 15,
    color: '#65E8B8',
    borderRadius: 7,
    fontSize: 18,
    marginVertical: 10,
    },
    passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20
    },
    button: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: '#5AD0A5'
    },
    buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    },
    loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
    },
    loginText: {
    fontSize: 14,
    color: '#C4C4C4'
    },
    loginButton: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#5AD0A5'
    },
    eyeButton: {
        position: 'absolute',
        right: 0,
        },
        eyeIcon: {
        padding: 10,
        },
    });

export default RegisterScreen;

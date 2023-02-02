import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Alert, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

//import { Icon } from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [borderColorUsername, setBorderColorUsername] = useState('#1E253E');
    const [borderColorPassword, setborderColorPassword] = useState('#1E253E');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);


    const handleLogin = async () => {
        Keyboard.dismiss();
        if (!username || !password) {
            return Alert.alert('Por favor, preencha todos os campos');
        }
        setLoading(true);

        try {

            const dados = {
                "email": username,
                "password": password
            }
            const response = await axios.post('https://brener.dev/api/login', dados);


            if (response.data) {
                const { token } = response.data;
                await AsyncStorage.setItem('token', token);
                setLoading(false);
                navigation.navigate('MainTab');
            } else {
                Alert.alert('Usuário ou senha inválidos');
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            Alert.alert('Erro ao fazer login, tente novamente mais tarde');
        }
    };



    return (
<View style={[styles.container, { backgroundColor: '#11172B' }]}>
<Text style={[styles.label, { color: '#65E8B8' }]}>E-mail</Text>
<TextInput
style={[styles.input, { borderColor: borderColorUsername }]}
value={username}
onChangeText={text => setUsername(text)}
onFocus={() => setBorderColorUsername('#63E2B4')}
onBlur={() => setBorderColorUsername('#1E253E')}
/>

<Text style={[styles.label, { color: '#65E8B8' }]}>Password</Text>
        <View style={styles.passwordContainer}>
        <TextInput
            secureTextEntry={secureTextEntry}
            value={password}
            onChangeText={text => setPassword(text)}
            onFocus={() => setborderColorPassword('#63E2B4')}
            onBlur={() => setborderColorPassword('#1E253E')}
            style={[styles.input, { borderColor: borderColorPassword }]}
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

            
            <TouchableOpacity style={[styles.button, { borderRadius: 7, backgroundColor: '#5AD0A5' }]} onPress={() => handleLogin()}>
            {loading ? (
            <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.buttonText}>Login</Text>
            )}
    </TouchableOpacity>

                <View style={styles.registerContainer}>
        <Text style={[styles.registerText, { color: '#65E8B8' }]}>Ainda não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.registerButton, { color: '#5AD0A5' }]}>Registrar-se</Text>
        </TouchableOpacity>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
    },
    label: {
    fontSize: 18,
    marginBottom: 10
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
    },
    button: {
    padding: 10,
    marginTop: 20,
    width: '100%'
    },
    buttonText: {
    fontSize: 18,
    textAlign: 'center'
    },
    registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
    },
    registerText: {
    fontSize: 14
    },
    registerButton: {
    fontWeight: 'bold',
    marginLeft: 5
    },
    eyeButton: {
    position: 'absolute',
    right: 0,
    },
    eyeIcon: {
    padding: 10,
    },
    });
  
  export default LoginScreen;

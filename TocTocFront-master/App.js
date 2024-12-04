// App.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AppButton from './components/AppButton';
import Toast from './components/Toast';
import TextField from './components/TextField';
import ColorManager from './utils/ColorManager';
import Spacer from './components/Spacer';
import { storeToken, getToken, removeToken } from './authToken'; // Importamos las funciones para manejar el token
import { signUp, signIn } from './api'; // Importamos las funciones de la API

const Stack = createStackNavigator();

export default function App() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastStyle, setToastStyle] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre registro y login
  const [message, setMessage] = useState('');

  const showErrorToast = (errorMessage) => {
    setToastStyle('failure');
    setToastMessage(errorMessage);
    setToastVisible(true);
  };

  const showSuccessToast = (successMessage) => {
    setToastStyle('success');
    setToastMessage(successMessage);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const handleLoginGoogle = () => {
    Alert.alert("No implementado aún");
  };

  const handleAuth = async () => {
    try {
      if (isLogin) {
        result = await signIn(email, password);
        showSuccessToast('Inicio de sesión exitoso');
        console.log('Token de inicio de sesión:', result.token);
        await storeToken(result.token); // Guardar el token usando la función importada
      } else {
        result = await signUp(email, password);// Falta la data del DTO UserSingup
        showSuccessToast('Registro exitoso');
        console.log('Token de inicio de sesión:', result.token);
        await storeToken(result.token);
      }
    } catch (error) {
      showErrorToast(error.message)
    }
  };

  const handlePress = () => {
    Alert.alert("Botón presionado");
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <Spacer />

      <TextField
        placeholder="Tu nombre de usuario o correo electrónico"
        title='Usuario'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextField
        placeholder="Mínimo 6 caracteres y una mayúscula"
        title='Contraseña'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Spacer />

      <AppButton
        title={isLogin ? 'Ingresar' : 'Registrarse'}
        styleType='normal'
        onPress={handleAuth}
      />
      <View style={{ height: 20 }} />
      <AppButton
        title='Ingresar con Google'
        styleType='normal'
        onPress={handleLoginGoogle}
      />
      <View style={{ height: 20 }} />
      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
      </Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Spacer />

      <Text style={styles.subtitle}>¿Olvidaste tu contraseña?</Text>
      <AppButton
        title='Recuperar contraseña'
        styleType='normal'
        onPress={handleLoginGoogle}
      />

      <Toast message={toastMessage} visible={toastVisible} toastStyle={toastStyle} onClose={hideToast} />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: ColorManager.getColor('lightBg')
  },
  title: {
    textAlign: 'center',
    paddingHorizontal: 30,
    fontSize: 30,
    marginTop: 30
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  toggleText: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
  message: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
});

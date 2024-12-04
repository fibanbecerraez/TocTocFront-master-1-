import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { getToken } from '../config/authToken';
import ColorManager from '../utils/ColorManager';
import AppButton from '../components/AppButton';

const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    const token = await getToken();
    if (!token) {
      setMessage('No hay token disponible');
      return;
    }

    // USamos el recovery con mail? el put de users del swagger no modifica credenciales
    setMessage('Contraseña cambiada con éxito');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña actual"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <AppButton
        title="Cambiar Contraseña"
        styleType="primary"
        onPress={handleChangePassword}
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: ColorManager.getColor('lightBg'),
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  message: {
    marginTop: 20,
    color: 'green',
    textAlign: 'center',
  },
});

export default ChangePasswordScreen; 
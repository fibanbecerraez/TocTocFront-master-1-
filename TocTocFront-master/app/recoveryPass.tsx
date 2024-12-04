import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import AppButton from '../components/AppButton'; // Asume que AppButton es un componente propio
import { t } from 'i18next';
import Toast from '../components/Toast';
import ColorManager from '../utils/ColorManager';
import { recoveryPass } from '../config/api';

const RecoveryPasswordScreen = () => {
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastStyle, setToastStyle] = useState('');

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

  // Maneja el envío del código
  const handleSendCode = async () => {
    if (!email) {
      showErrorToast('Error Por favor ingresa un correo electrónico.');
      return;
    }

    if (!validateEmail(email)) {
      showErrorToast('Error Por favor ingresa un correo electrónico válido.');
      return;
    }
    await recoveryPass(email)

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      showSuccessToast('Éxito: Se ha enviado un código al correo electrónico.');
    });
  };

  // Función para validar el email (simple validación)
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperación de Contraseña</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <AppButton
        title={t('enviar codigo')}
        styleType='normal'
        onPress={handleSendCode} // Asumimos que AppButton maneja el estado de carga
      />
       <Toast message={toastMessage} visible={toastVisible} toastStyle={toastStyle} onClose={hideToast} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: ColorManager.getColor('lightBg')
    },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default RecoveryPasswordScreen;

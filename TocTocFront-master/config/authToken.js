import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token, refreshToken) => {
  try {
    await AsyncStorage.multiSet([
      ['authToken', token],
      ['refreshToken', refreshToken]
    ]);
    console.log('Tokens guardados correctamente');
  } catch (error) {
    console.error('Error al guardar los tokens:', error);
  }
};

export const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (refreshToken !== null) {
      return refreshToken;
    } else {
      console.log('No se encontró refresh token');
    }
  } catch (error) {
    console.error('Error al obtener el refresh token:', error);
  }
  return null;
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null) {
      return token;
    } else {
      console.log('No se encontró ningún token');
    }
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
  return null;
};

export const removeTokens = async () => {
  try {
    await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
    console.log('Tokens eliminados correctamente');
  } catch (error) {
    console.error('Error al eliminar los tokens:', error);
  }
};

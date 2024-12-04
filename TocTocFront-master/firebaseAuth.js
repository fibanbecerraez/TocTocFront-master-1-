// firebaseAuth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Función para registrar un nuevo usuario
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Usuario registrado:', userCredential.user);
    return userCredential.user; // Retorna el usuario registrado
  } catch (error) {
    console.error('Error en el registro:', error.message);
    throw error; // Lanza el error para manejarlo más adelante
  }
};

// Función para iniciar sesión
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Usuario conectado:', userCredential.user);
    return userCredential.user; // Retorna el usuario conectado
  } catch (error) {
    console.error('Error en el login:', error.message);
    throw error; // Lanza el error para manejarlo más adelante
  }
};

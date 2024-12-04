import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import ColorManager from '../utils/ColorManager';
import axios from 'axios';
import Toast from '../components/Toast';  // Componente de toast si lo necesitas
import { createPost, createSimplePost } from '../config/api';

const CreatePost = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastStyle, setToastStyle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const hideToast = () => {
    setToastVisible(false);
  };

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

  const pickMedia = async () => {
    try {
      // Solicitar permisos primero
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        setToastMessage('Se requieren permisos para acceder a la galería');
        setToastStyle('error');
        setToastVisible(true);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setMedia(result.assets[0].uri);
        setToastMessage('Medio seleccionado exitosamente');
        setToastStyle('success');
        setToastVisible(true);
      } else {
        setToastMessage('Selección cancelada');
        setToastStyle('error');
        setToastVisible(true);
      }
    } catch (error) {
      setToastMessage('Error al seleccionar medio');
      setToastStyle('error');
      setToastVisible(true);
      console.error(error);
    }
  };

  const handlePostSubmit = async () => {
    try {
      setIsLoading(true);

      if (media) {
        await createPost(media, content, location);
      } else {
        await createSimplePost(content, location);
      }

      // Limpiar el formulario después de enviar
      setContent('');
      setLocation('');
      setMedia(null);

      showSuccessToast('Post creado exitosamente');
    } catch (error) {
      console.error('Error al crear el post:', error);
      showErrorToast('Error al crear el post: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputContent}
        placeholder="Escribe tu contenido aquí..."
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.textInputLocation}
        placeholder="Ubicación"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.mediaButton} onPress={pickMedia}>
        <Text style={styles.mediaButtonText}>Adjuntar Imagen o Video</Text>
      </TouchableOpacity>
      {media && (
        <View style={styles.mediaPreview}>
          <Image source={{ uri: media }} style={styles.mediaPreviewImage} />
        </View>
      )}
      <TouchableOpacity
        onPress={handlePostSubmit}
        style={[styles.submitButton, isLoading && styles.disabledButton]}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Publicando...' : 'Publicar'}
        </Text>
      </TouchableOpacity>

      <Toast
        message={toastMessage} visible={toastVisible} toastStyle={toastStyle} onClose={hideToast}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: ColorManager.getColor('lightBg'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContent: {
    height: 120,
    borderColor: '#ccc',
    backgroundColor: ColorManager.getColor('white'),
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    width: '100%',
  },
  textInputLocation: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: ColorManager.getColor('white'),
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    width: '100%',
  },
  mediaPreview: {
    marginVertical: 15,
    alignItems: 'center',
  },
  mediaPreviewImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  mediaPreviewText: {
    fontSize: 16,
    color: '#666',
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 20,
  },
  mediaButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default CreatePost;

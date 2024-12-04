import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ColorManager from '../utils/ColorManager';
import { router } from 'expo-router';
import Feed from '../components/Feed';
import Toast from '../components/Toast';
import { getUserProfile } from '../config/api';

const OtherUserProfileScreen = () => {
  const feedReference = useRef(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastStyle, setToastStyle] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    email: '',
    bio: null,
    profileImage: null,
    bannerImage: null,
  });
  const DEFAULT_BIO = "Este usuario aún no ha agregado una biografía.";

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const data = await getUserProfile();
      setUserData(data);
    } catch (error) {
      showErrorToast('Error al cargar el perfil');
    }
  };

  const handleLogoPress = () => {
    feedReference.current?.scrollToTop();
  };

  const handleFollowsPress = () => {
    router.push('/follows');
  };

  const handleFollowersPress = () => {
    router.push('/followers');
  };

  const showErrorToast = (errorMessage) => {
    setToastStyle('failure');
    setToastMessage(errorMessage);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={handleLogoPress}>
            <Image
              source={require('../assets/adaptive-icon.png')} // Ruta correcta a tu imagen local
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Icon name="arrow-back" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Banner (sin opción de cambio) */}
        <View style={styles.bannerContainer}>
          <Image
            source={
              userData.bannerImage?.uri
                ? { uri: userData.bannerImage.uri }
                : { uri: 'https://fakeimg.pl/2000x300/1ba337/ffffff?text=Banner' }
            }
            style={styles.bannerImage}
          />
        </View>

        {/* Perfil (sin opción de cambio) */}
        <View style={styles.profileInfoContainer}>
          <Image
            source={
              userData.profileImage?.uri
                ? { uri: userData.profileImage.uri }
                : { uri: 'https://fakeimg.pl/100x100/cccccc/e60000?text=Perfil' }
            }
            style={styles.profileImageLarge}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {`${userData.name} ${userData.lastname}`}
            </Text>
            <Text style={styles.userEmail}>
              {`@${userData.email?.split('@')[0]}`}
            </Text>
            <Text style={styles.bioText}>
              {userData.bio || DEFAULT_BIO}
            </Text>
          </View>
        </View>

        {/* Botones de Favoritos, Seguidos y Seguidores */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFollowsPress} style={styles.button}>
            <Text style={styles.buttonText}>Seguidos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFollowersPress} style={styles.button}>
            <Text style={styles.buttonText}>Seguidores</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Feed con los posts del usuario */}
      <View style={{ flex: 1 }}>
        <Feed
          ref={feedReference}
          loading={false}
          onLoadMore={() => console.log('Cargar más posts')}
          onRefresh={() => console.log('Refrescar feed')}
          refreshing={false}
        />
      </View>

      <Toast message={toastMessage} visible={toastVisible} toastStyle={toastStyle} onClose={hideToast} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: ColorManager.getColor('lightBg'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  bannerContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -50,
    backgroundColor: ColorManager.getColor('white'),
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  profileImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
  },
  userInfo: {
    justifyContent: 'center',
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: ColorManager.getColor('black'),
  },
  userEmail: {
    fontSize: 14,
    color: ColorManager.getColor('placeholderGray'),
    marginBottom: 8,
  },
  bioText: {
    fontSize: 14,
    color: ColorManager.getColor('black'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: ColorManager.getColor('buttonMain')
  },
  buttonText: {
    fontSize: 16,
    color: ColorManager.getColor('black'),
  },
});

export default OtherUserProfileScreen;

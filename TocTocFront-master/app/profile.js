import React, { useState, useRef, useEffect } from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ColorManager from "../utils/ColorManager";

import { router } from "expo-router";
import Feed from "../components/Feed";
import Toast from "../components/Toast";
import * as ImagePicker from "expo-image-picker";
import { getUserProfile, updateUserBio } from "../config/api";
import { styles } from "./profile.styles.js";

const ProfileScreen = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStyle, setToastStyle] = useState("");
  const feedReference = useRef(null);
  const [imageUri, setImageUri] = useState(
    "https://fakeimg.pl/30x30/cccccc/e60000?text=hugo"
  );
  const [imageBanner, setImageBanner] = useState(
    "https://fakeimg.pl/2000x300/1ba337/ffffff?text=Banner"
  );
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    bio: null,
    profileImage: null,
    bannerImage: null,
  });
  const [isBioModalVisible, setIsBioModalVisible] = useState(false);
  const [bioInput, setBioInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const DEFAULT_BIO =
    "Si yo fuera una cafetera, mi sueño húmedo sería que me toquen las manos de godio";

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const data = await getUserProfile();
      setUserData(data);
      setBioInput(data.bio || DEFAULT_BIO);
    } catch (error) {
      showErrorToast("Error al cargar el perfil");
    }
  };

  const handleLogoPress = () => {
    feedReference.current?.scrollToTop();
  };

  const handleSearchPress = () => {
    setIsSearching(true);
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };

  const handleFollowersPress = () => {
    router.push("/followers");
  };

  const handleFollowsPress = () => {
    router.push("/follows");
  };

  const goToFavorites = () => {
    router.push("favorites");
  };

  const handleProfilePress = () => {
    console.log("Ir al perfil de usuario");
  };

  const handleLoadMore = () => {
    const errorMessage = "Error: Función no implementada (Load More)";
    console.error(errorMessage);
    showErrorToast(errorMessage);
  };

  const handleRefresh = () => {
    const errorMessage = "Error: Función no implementada (Refresh)";
    console.error(errorMessage);
    showErrorToast(errorMessage);
  };

  const showErrorToast = (errorMessage) => {
    setToastStyle("failure");
    setToastMessage(errorMessage);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const pickImage = async (type: "banner" | "profile") => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);

        // Aquí iría la lógica para subir la imagen al servidor
        showErrorToast("Falta mandarla al backend");
      }
    } catch (error) {
      showErrorToast("Error al seleccionar la imagen");
    }
  };

  const handleBioEdit = async () => {
    try {
      setBioInput(bioInput);
      await updateUserBio(bioInput);
      setBioInput(bioInput);
      setUserData((prev) => ({ ...prev, bio: bioInput }));
      setIsBioModalVisible(false);
      setIsEditing(false);
      showErrorToast("Biografía actualizada con éxito");
    } catch (error) {
      showErrorToast("Error al actualizar la biografía");
    }
  };

  const BioModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isBioModalVisible}
      onRequestClose={() => setIsBioModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsBioModalVisible(false)}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: ColorManager.getColor("white") },
          ]}
        >
          <Text
            style={[
              styles.modalTitle,
              { color: ColorManager.getColor("black") },
            ]}
          >
            Editar Biografía
          </Text>
          <TextInput
            style={styles.bioInput}
            value={bioInput}
            //onChangeText={setBioInput}
            placeholder="Escribe tu biografía aquí..."
            editable={isEditing}
          />
          <View style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={[
                    styles.modalCloseButton,
                    { backgroundColor: ColorManager.getColor("lightBlue") },
                  ]}
                  onPress={handleBioEdit}
                >
                  <Text
                    style={[
                      styles.modalCloseButtonText,
                      { color: ColorManager.getColor("white") },
                    ]}
                  >
                    Aceptar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalCloseButton,
                    { backgroundColor: ColorManager.getColor("lightBlue") },
                  ]}
                  onPress={() => {
                    setIsEditing(false);
                    setBioInput(userData.bio || DEFAULT_BIO);
                  }}
                >
                  <Text
                    style={[
                      styles.modalCloseButtonText,
                      { color: ColorManager.getColor("white") },
                    ]}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[
                  styles.modalCloseButton,
                  { backgroundColor: ColorManager.getColor("lightBlue") },
                ]}
                onPress={() => setIsEditing(true)}
              >
                <Text
                  style={[
                    styles.modalCloseButtonText,
                    { color: ColorManager.getColor("white") },
                  ]}
                >
                  Editar
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!isSearching && (
          <>
            <View style={styles.logoContainer}>
              <TouchableOpacity onPress={handleLogoPress}>
                <Image
                  source={require("../assets/adaptive-icon.png")} // Ruta correcta a tu imagen local
                  style={styles.logo}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.rightIcons}>
              <TouchableOpacity
                onPress={handleSearchPress}
                style={styles.iconButton}
              >
                <Icon name="search" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSettingsPress}
                style={styles.iconButton}
              >
                <Icon name="settings" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleProfilePress}
                style={styles.iconButton}
              >
                <Image
                  source={{
                    uri: imageUri,
                  }} // Placeholder para la imagen de perfil
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
        {isSearching && (
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            autoFocus
            onBlur={() => setIsSearching(false)} // Ocultar campo de búsqueda al perder foco
          />
        )}
      </View>

      <View style={styles.content}>
        {/* Banner con botón de cambio */}
        <View style={styles.bannerContainer}>
          <Image
            source={
              userData.bannerImage?.uri
                ? { uri: userData.bannerImage.uri }
                : {
                    uri: imageBanner,
                  }
            }
            style={styles.bannerImage}
          />
          <TouchableOpacity
            style={styles.changeBannerButton}
            onPress={() => pickImage("banner")}
          >
            <Icon name="camera" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Perfil con botón de cambio */}
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                userData.profileImage?.uri
                  ? { uri: userData.profileImage.uri }
                  : {
                      uri: imageUri,
                    }
              }
              style={styles.profileImageLarge}
            />
            <TouchableOpacity
              style={styles.changeProfileImageButton}
              onPress={() => pickImage("profile")}
            >
              <Icon name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {`${userData.name} ${userData.lastname}`}
            </Text>
            <Text style={styles.userEmail}>
              {`@${userData.email?.split("@")[0]}`}
            </Text>
            <TouchableOpacity
              style={styles.bioButton}
              onPress={() => {
                setIsBioModalVisible(true);
                setIsEditing(false);
              }}
            >
              <Text
                style={styles.bioButtonText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userData.bio || DEFAULT_BIO}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => showErrorToast("Función de edición en desarrollo")}
          >
            <Icon name="create-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Botones de Favoritos, Seguidos y Seguidores */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goToFavorites}>
            <Text style={styles.buttonText}>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFollowsPress} style={styles.button}>
            <Text style={styles.buttonText}>Seguidos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFollowersPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Seguidores</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Feed con los posts del user */}
      <View style={{ flex: 1 }}>
        <Feed
          ref={feedReference}
          loading={false}
          onLoadMore={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={false}
        />
      </View>

      <Toast
        message={toastMessage}
        visible={toastVisible}
        toastStyle={toastStyle}
        onClose={hideToast}
      />
      <BioModal />
    </View>
  );
};

export default ProfileScreen;

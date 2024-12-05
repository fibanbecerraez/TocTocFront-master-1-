import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ColorManager from "../utils/ColorManager";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./favorites.styles";

interface Props {}

const FavoritesScreen: React.FC<Props> = () => {
  const [isSearching, setIsSearching] = useState(false);
  const feedReference = useRef(null);

  const handleLogoPress = () => {
    router.push("/homeScreen");
  };

  const handleSearchPress = () => {
    setIsSearching(true);
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleNotificationsPress = () => {
    router.push("/notifications");
  };

  const handleCreatePostPress = () => {
    router.push("/createPost");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!isSearching ? (
          <>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={handleLogoPress}
            >
              <Image
                source={require("../assets/adaptive-icon.png")}
                style={styles.logo}
              />
            </TouchableOpacity>

            <View style={styles.rightIcons}>
              <TouchableOpacity
                onPress={handleSearchPress}
                style={styles.touchableArea}
              >
                <Icon name="search" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSettingsPress}
                style={styles.touchableArea}
              >
                <Icon name="settings" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleProfilePress}
                style={styles.touchableArea}
              >
                <Image
                  source={{
                    uri: "https://fakeimg.pl/30x30/cccccc/e60000?text=hugo",
                  }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNotificationsPress}
                style={styles.touchableArea}
              >
                <Icon name="notifications" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar..."
            autoFocus
            onSubmitEditing={handleSearchSubmit}
            onBlur={() => setIsSearching(false)}
          />
        )}
      </View>
      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.tituloFavoritos}>Favoritos</Text>
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;

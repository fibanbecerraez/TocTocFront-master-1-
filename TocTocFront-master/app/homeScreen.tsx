import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import Feed from "../components/Feed";
import ColorManager from "../utils/ColorManager";
import { getAds, loadAllPosts } from "../config/api";

const homeScreen = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPost, setSelectedPost] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [ads, setAds] = useState([]);
  const feedReference = useRef(null);

  const handleLogoPress = () => {
    feedReference.current?.scrollToTop();
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

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const dataPost = await loadAllPosts(page);
      setPosts((prevPosts) =>
        page === 0 ? dataPost.content : [...prevPosts, ...dataPost.content]
      );
      setTotalPages(dataPost.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error cargando los posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage + 1 < totalPages && !loading) {
      fetchPosts(currentPage + 1);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts(0);
    setRefreshing(false);
  };

  const openPostModal = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closePostModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const consulta = (query) => {
    const results = [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "John",
        lastname: "Doe",
        bio: "This is John's bio.",
        profileImage: {
          uri: "https://fakeimg.pl/100x100/cccccc/e60000?text=John",
        },
      },
    ];
    setSearchResults(results);
  };

  const handleSearchSubmit = (event) => {
    const query = event.nativeEvent.text;
    consulta(query);
    setIsSearching(false);
  };

  const fetchAds = async () => {
    try {
      const adsData = await getAds();
      setAds(adsData);
    } catch (error) {
      console.error("Error cargando anuncios:", error);
    }
  };

  useEffect(() => {
    fetchPosts(0);
    fetchAds();
  }, []);

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

      <View style={styles.content}>
        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(_, index) => index.toString()} // Usa el índice como clave
            renderItem={({ item }) => (
              <View style={styles.searchResult}>
                <Image
                  source={{ uri: item.profileImage.uri }}
                  style={styles.searchResultImage}
                />
                <View>
                  <Text style={styles.searchResultName}>
                    {item.name} {item.lastname}
                  </Text>
                  <Text style={styles.searchResultBio}>{item.bio}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Feed
            ref={feedReference}
            posts={posts}
            ads={ads}
            loading={loading}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onLoadMore={handleLoadMore}
            onPostPress={openPostModal}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={handleCreatePostPress}
        style={styles.floatingButton}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closePostModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPost && (
              <>
                <Text style={styles.modalTitle}>{selectedPost.title}</Text>
                <Text style={styles.modalBody}>{selectedPost.body}</Text>
                <Text>s</Text>
                <ScrollView>
                  {selectedPost.comments &&
                    selectedPost.comments.map((comment, index) => (
                      <Text key={index} style={styles.comment}>
                        {comment}
                      </Text>
                    ))}
                </ScrollView>
              </>
            )}
            <TouchableOpacity
              onPress={closePostModal}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: ColorManager.getColor("lightBg"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  logoContainer: {
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  touchableArea: {
    padding: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    fontSize: 18,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: ColorManager.getColor("lightBlue"),
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: ColorManager.getColor("red"),
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  searchResult: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  searchResultImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  searchResultName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchResultBio: {
    fontSize: 14,
    color: "#666",
  },
});

export default homeScreen;

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import axios from "axios";
import { getToken } from "../config/authToken";
import Feed from "../components/Feed";
import { styles } from "./favorites.styles"; // Tu archivo de estilos

const API_URL = "https://toctoc-production.up.railway.app";

const FavoritesScreen = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const feedReference = useRef(null);

  useEffect(() => {
    (async () => {
      await fetchPosts(0);
    })();
  }, []);

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

  const loadAllPosts = async (page = 0) => {
    try {
      const response = await fetch(`${API_URL}/post/all?page=${page}&size=4`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Error al cargar los posts");
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  const buscarPostFavoritos = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/favorite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error("Error cargando favoritos:", error);
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

  const handleSearchSubmit = (e) => {
    const searchTerm = e.nativeEvent.text;
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPosts(filteredPosts);
    setIsSearching(false);
  };
  const openPostModal = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closePostModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const handleCreatePostPress = () => {
    router.push("/createPost");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloFavoritos}>Favoritos</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Feed
          ref={feedReference}
          posts={posts}
          loading={loading}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onLoadMore={handleLoadMore}
          onPostPress={openPostModal}
        />
      )}
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

export default FavoritesScreen;

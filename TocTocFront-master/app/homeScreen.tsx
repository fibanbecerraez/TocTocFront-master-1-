import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Modal, Text, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import Feed from '../components/Feed';
import ColorManager from '../utils/ColorManager';
import { getAds, loadAllPosts } from '../config/api';

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
    router.push('/settings');
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleNotificationsPress = () => {
    router.push('/notifications');
  };

  const handleCreatePostPress = () => {
    router.push('/createPost');
  };

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const dataPost = await loadAllPosts(page);
      setPosts(prevPosts => page === 0 ? dataPost.content : [...prevPosts, ...dataPost.content]);
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

  // Simulación de la función que daria el resultado de users
  const consulta = (query) => {
    const results = [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        identityId: "string",
        name: "John",
        lastname: "Doe",
        email: "johndoe@example.com",
        profileImage: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "Profile Image",
          uri: "https://fakeimg.pl/100x100/cccccc/e60000?text=John",
          type: "IMAGE"
        },
        bannerImage: {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "Banner Image",
          uri: "https://fakeimg.pl/300x100/cccccc/e60000?text=Banner",
          type: "IMAGE"
        },
        bio: "This is John's bio.",
        gender: "Male",
        level: 1
      }
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
      console.log(adsData)
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
        {!isSearching && (
          <>
            <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
              <Image
                source={require('../assets/adaptive-icon.png')}
                style={styles.logo}
              />
            </TouchableOpacity>

            <View style={styles.rightIcons}>
              <TouchableOpacity onPress={handleSearchPress} style={styles.iconButton}>
                <Icon name="search" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSettingsPress} style={styles.iconButton}>
                <Icon name="settings" size={30} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleProfilePress} style={styles.iconButton}>
                <Image
                  source={{ uri: 'https://fakeimg.pl/30x30/cccccc/e60000?text=hugo' }}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNotificationsPress} style={styles.iconButton}>
                <Icon name="notifications" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          </>
        )}
        {isSearching && (
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.searchResult}>
                <Image source={{ uri: item.profileImage.uri }} style={styles.searchResultImage} />
                <View>
                  <Text style={styles.searchResultName}>{item.name} {item.lastname}</Text>
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
                <ScrollView>
                  {selectedPost.comments && selectedPost.comments.map((comment, index) => (
                    <Text key={index} style={styles.comment}>{comment}</Text>
                  ))}
                </ScrollView>
              </>
            )}
            <TouchableOpacity onPress={closePostModal} style={styles.closeButton}>
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
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconButton: {
    marginLeft: 15,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    fontSize: 18,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  content: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: ColorManager.getColor('lightBlue'),
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    marginVertical: 10,
    fontSize: 16,
  },
  comment: {
    marginVertical: 5,
    fontSize: 14,
    color: '#555',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: ColorManager.getColor('lightBlue'),
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchResult: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  searchResultImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchResultBio: {
    fontSize: 14,
    color: '#555',
  },
});

export default homeScreen;

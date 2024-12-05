import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Divider from "./Divider";

interface PostProps {
  profileImage: string | null;
  name: string;
  username: string;
  text: string;
  postImage?: string;
  likes: number;
  comments: number;
  onPress: () => void;
}

const darLike = () => {
  Alert.alert("Exito","Le has dado like a esta publicación");
//   Aca va endpoint para ejecutar cuando se da like, (un post)
// Si no le di like (+1)
// Si ya le di like (-1)
};

const Post: React.FC<PostProps> = ({
  profileImage,
  name,
  username,
  text,
  postImage,
  likes,
  comments,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.text}>{text}</Text>
          {/* <Text>Vamoss boooooca</Text> */}
          {postImage && (
            <Image source={{ uri: postImage }} style={styles.postImage} />
          )}
          <Divider />
          <View style={styles.footer}>
            <View style={styles.iconContainer}>
              <FontAwesome
                name="heart"
                size={16}
                color="#e0245e"
                onPress={() => darLike()}
              />
              <Text style={styles.iconText}>{likes}</Text>
            </View>
            <View style={styles.iconContainer}>
              <FontAwesome name="comment" size={16} color="#5b7083" />
              <Text style={styles.iconText}>{comments}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Máscara circular
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    color: "#5b7083",
  },
  text: {
    fontSize: 16,
    color: "#14171a",
    marginBottom: 5,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  iconText: {
    fontSize: 14,
    color: "#5b7083",
    marginLeft: 5,
  },
});

export default Post;

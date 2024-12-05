import { StyleSheet } from "react-native";
import ColorManager from "../utils/ColorManager";

export const styles = StyleSheet.create({
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 15,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
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
  bannerContainer: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    position: "relative", // Para posicionar el botón
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: -50,
    backgroundColor: ColorManager.getColor("white"),
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  profileImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 50, // Máscara circular
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 10,
  },
  userInfo: {
    justifyContent: "center",
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: ColorManager.getColor("black"),
  },
  userEmail: {
    fontSize: 14,
    color: ColorManager.getColor("placeholderGray"),
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: "#1ba337",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: ColorManager.getColor("buttonMain"),
  },
  buttonText: {
    fontSize: 16,
    color: ColorManager.getColor("black"),
  },
  changeBannerButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 8,
    elevation: 3,
  },
  profileImageContainer: {
    position: "relative", // Para posicionar el botón
  },
  changeProfileImageButton: {
    position: "absolute",
    right: 10,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 15,
    padding: 6,
    elevation: 3,
  },
  bioButton: {
    backgroundColor: ColorManager.getColor("white"),
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ColorManager.getColor("buttonMain"),
  },
  bioButtonText: {
    fontSize: 14,
    color: ColorManager.getColor("black"),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: ColorManager.getColor("white"),
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: ColorManager.getColor("black"),
    marginBottom: 15,
    textAlign: "center",
  },
  modalBioText: {
    fontSize: 16,
    lineHeight: 24,
    color: ColorManager.getColor("black"),
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: ColorManager.getColor("lightBlue"),
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCloseButtonText: {
    color: ColorManager.getColor("white"),
    fontSize: 16,
    fontWeight: "bold",
  },
  bioInput: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

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
  contenido: {
    justifyContent: "center",
    alignItems: "center",
  },
  tituloFavoritos: {
    fontWeight: "bold",
    fontSize: 20,
    width: "100%",
    backgroundColor: "rgba(238, 232, 222, 0.3)", // Color EEE8DE con 80% de opacidad
    textAlign: "center",
    paddingVertical: 5,
  },
});

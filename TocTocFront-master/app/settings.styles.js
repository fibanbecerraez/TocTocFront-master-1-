import { StyleSheet } from "react-native";
import ColorManager from "../utils/ColorManager";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorManager.getColor("lightBg"),
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ColorManager.getColor("buttonMain"), // Color marrón claro
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  icon: {
    fontSize: 20,
  },
  logoutButton: {
    backgroundColor: "#D2B48C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: "#000",
  },
  deleteButton: {
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: {
    fontSize: 16,
    color: "red",
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
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalOption: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  languageModalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  languageOption: {
    fontSize: 16,
    paddingVertical: 10,
    color: "#000",
  },
  languageButton: {
    backgroundColor: "#D2B48C",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  languageButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  redonditoVerde: {
    width: 20, // Ancho del círculo
    height: 20, // Alto del círculo
    borderRadius: 25, // Mitad del ancho/alto para que sea redondo
    backgroundColor: "#2fb939", // Color verde
  },
});

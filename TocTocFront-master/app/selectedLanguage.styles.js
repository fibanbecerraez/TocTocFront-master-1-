import { StyleSheet } from "react-native";
import ColorManager from "../utils/ColorManager";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Color de fondo claro
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Fondo transparente para el modal
  },
  modalContainer: {
    width: 300,
    maxHeight: 400, // Altura máxima del modal
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

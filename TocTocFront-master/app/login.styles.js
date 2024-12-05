import { StyleSheet } from "react-native";
import ColorManager from "../utils/ColorManager";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: ColorManager.getColor("lightBg"),
  },
  title: {
    textAlign: "center",
    paddingHorizontal: 30,
    fontSize: 30,
    marginTop: 30,
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: 30,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  toggleText: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
  message: {
    marginTop: 10,
    color: "red",
    textAlign: "center",
  },
});

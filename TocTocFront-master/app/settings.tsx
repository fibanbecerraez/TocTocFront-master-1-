import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { router, useNavigation } from "expo-router";
import ColorManager from "../utils/ColorManager";
import { removeTokens, getToken } from "../config/authToken";
import { deleteUserAccount } from "../config/api";
import Toast from "../components/Toast";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStyle, setToastStyle] = useState("");

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const showErrorToast = (errorMessage) => {
    setToastStyle("failure");
    setToastMessage(errorMessage);
    setToastVisible(true);
  };

  const showSuccessToast = (successMessage) => {
    setToastStyle("success");
    setToastMessage(successMessage);
    setToastVisible(true);
  };

  const hideToast = () => {
    setToastVisible(false);
  };

  const handleLogoutPress = async () => {
    try {
      // Eliminar el token de autenticación
      await removeTokens();
      
      // Verificar si el token fue eliminado
      const token = await getToken();
      if (!token) {
        // Mostrar mensaje de éxito
        showSuccessToast('Sesión cerrada con éxito');
        
        // Redirigir a la pantalla de login sin posibilidad de volver
        router.replace("/login");
      } else {
        // Si el token no fue eliminado, mostrar error
        showErrorToast('Hubo un error al cerrar sesión');
      }
    } catch (error) {
      // Manejo de errores
      showErrorToast('Hubo un problema al cerrar sesión');
    }
  };
  

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleChangePasswordPress = () => {
    router.push("/changePassword");
  };

  const handleDeleteAccountPress = () => {
    setDeleteModalVisible(true);
  };

  const confirmDeleteAccount = async () => {
    if (confirmationText === "Quiero borrar mi cuenta") {
      const token = await getToken();
      if (!token) {
        showErrorToast("No hay token disponible");
        return;
      }

      try {
        await deleteUserAccount();
        showSuccessToast("Cuenta eliminada con éxito");
        removeTokens();
        setDeleteModalVisible(false);
        router.replace("./index");
      } catch (error) {
        showErrorToast(error.message);
      }
    } else {
      showErrorToast(
        'Por favor, escribe "Quiero borrar mi cuenta" para confirmar.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuración y privacidad</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Notificaciones</Text>
        <Text style={styles.icon}>🔔</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Cuentas bloqueadas</Text>
        <Text style={styles.icon}>🚫</Text>
      </View>

      <View style={styles.option} onTouchEnd={handleChangePasswordPress}>
        <Text style={styles.optionText}>Contraseña y seguridad</Text>
        <Text style={styles.icon}>🔒</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Idioma</Text>
        <Text style={styles.icon}>🌐</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Tiempo de uso de la aplicación</Text>
        <Text style={styles.icon}>🕒</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Modo Oscuro</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteAccountPress}
      >
        <Text style={styles.deleteText}>Eliminar cuenta</Text>
      </TouchableOpacity>

      <Toast
        message={toastMessage}
        visible={toastVisible}
        toastStyle={toastStyle}
        onClose={hideToast}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Confirmar eliminación de cuenta
            </Text>
            <Text>Escribe "Quiero borrar mi cuenta" para confirmar:</Text>
            <TextInput
              style={styles.input}
              value={confirmationText}
              onChangeText={setConfirmationText}
            />
            <View style={styles.modalButtons}>
              <Button
                title="Cancelar"
                onPress={() => setDeleteModalVisible(false)}
              />
              <Button title="Confirmar" onPress={confirmDeleteAccount} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorManager.getColor("lightBg"), // Color beige claro
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
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
});

export default SettingsScreen;

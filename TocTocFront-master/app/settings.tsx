import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { styles } from "./settings.styles";
import { router, useNavigation } from "expo-router";
import { removeTokens, getToken } from "../config/authToken";
import { deleteUserAccount } from "../config/api";
import Toast from "../components/Toast";

// Idiomas disponibles
const idiomasDisponibles = {
  ingles: "Inglés",
  espanol: "Español",
};

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStyle, setToastStyle] = useState("");

  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  // Modal de cambio de idioma
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");

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
        showSuccessToast("Sesión cerrada con éxito");

        // Redirigir a la pantalla de login sin posibilidad de volver
        router.replace("/login");
      } else {
        // Si el token no fue eliminado, mostrar error
        showErrorToast("Hubo un error al cerrar sesión");
      }
    } catch (error) {
      // Manejo de errores
      showErrorToast("Hubo un problema al cerrar sesión");
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

  const openLanguageModal = () => {
    setLanguageModalVisible(true);
  };

  const closeLanguageModal = () => {
    setLanguageModalVisible(false);
  };

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    closeLanguageModal();
    showSuccessToast(`Idioma cambiado a ${language}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuración y privacidad</Text>
      </View>

      <View style={styles.option} onTouchEnd={handleChangePasswordPress}>
        <Text style={styles.optionText}>Contraseña y seguridad</Text>
        <Text style={styles.icon}>🔒</Text>
      </View>

      {/* Opción para cambiar el idioma */}
      <View style={styles.option} onTouchEnd={openLanguageModal}>
        <Text style={styles.optionText}>Idioma</Text>
        <Text style={styles.icon}>🌐</Text>
      </View>

      {/* Muestra el idioma seleccionado
      {selectedLanguage && (
        <Text style={{ marginTop: 20, fontSize: 20 }}>
          Idioma seleccionado: {selectedLanguage}
        </Text>
      )} */}

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

      {/* Modal para seleccionar el idioma */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLanguageModalVisible}
        onRequestClose={closeLanguageModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Idioma</Text>
            {/* Lista de idiomas */}
            {Object.values(idiomasDisponibles).map((idioma, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleLanguageSelection(idioma)}
              >
                <View style={styles.modalOption}>
                  <Text>{idioma}</Text>
                  {selectedLanguage === idioma ? <View style={styles.redonditoVerde}></View> : <></>}

                </View>
              </TouchableOpacity>
            ))}
            <Button title="Cerrar" onPress={closeLanguageModal} />
          </View>
        </View>
      </Modal>

      {/* Modal de confirmación de eliminación de cuenta */}
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

export default SettingsScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { styles } from "./selectedLanguage.styles";

// Idiomas disponibles
const idiomasDisponibles = {
  ingles: "Inglés",
  espanol: "Español",
};

export default function SelectedLanguageScreen() {
  // Estado para controlar la visibilidad del modal y el idioma seleccionado
  const [modalVisible, setModalVisible] = useState(false);
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState(null);

  // Función para manejar la selección de un idioma
  const handleIdiomaSeleccionado = (idioma) => {
    setIdiomaSeleccionado(idioma);
    setModalVisible(false);
  };

  // Renderiza la lista de idiomas
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleIdiomaSeleccionado(item)}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18 }}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal */}
      <TouchableOpacity
        style={{ backgroundColor: "#4CAF50", padding: 10, borderRadius: 5 }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Seleccionar Idioma</Text>
      </TouchableOpacity>

      {/* Mostrar el idioma seleccionado */}
      {idiomaSeleccionado && (
        <Text style={{ marginTop: 20, fontSize: 20 }}>
          Idioma seleccionado: {idiomaSeleccionado}
        </Text>
      )}

      {/* Modal para mostrar la lista de idiomas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={Object.values(idiomasDisponibles)}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

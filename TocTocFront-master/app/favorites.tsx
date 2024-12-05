import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {}

const FavoritesScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de Favoritos</Text>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Fondo blanco
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

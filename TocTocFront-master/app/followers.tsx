import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import ColorManager from '../utils/ColorManager';

const followersData = [
    { id: '1', name: 'Steven Naranjo', avatar: 'https://avatar.iran.liara.run/public/13', isFollowing: false },
    { id: '2', name: 'Dinosaurio Feliz', avatar: 'https://avatar.iran.liara.run/public/43', isFollowing: false },
    { id: '3', name: 'Sneider Galindo', avatar: 'https://avatar.iran.liara.run/public/5', isFollowing: false },
    { id: '4', name: 'Valeria Corral', avatar: 'https://avatar.iran.liara.run/public/65', isFollowing: false },
    { id: '5', name: 'Steven Manzanos', avatar: 'https://avatar.iran.liara.run/public/37', isFollowing: true },
    { id: '6', name: 'Dinosaurio Bicicletero', avatar: 'https://avatar.iran.liara.run/public/49', isFollowing: true },
    { id: '7', name: 'Sneider Galindo II', avatar: 'https://avatar.iran.liara.run/public/46', isFollowing: true },
    { id: '8', name: 'Agustina Corral', avatar: 'https://avatar.iran.liara.run/public/74', isFollowing: true },
];

export default function FollowersScreen() {
    const [followers, setFollowers] = useState(followersData);
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar seguidores según el término de búsqueda
    const filteredFollowers = followers.filter((follower) =>
        follower.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para alternar el estado de seguimiento
    const toggleFollow = (id) => {
        const updatedFollowers = followers.map((follower) =>
            follower.id === id ? { ...follower, isFollowing: !follower.isFollowing } : follower
        );
        setFollowers(updatedFollowers);
    };

    // Renderizar cada elemento de la lista
    const renderItem = ({ item }) => (
        <View style={styles.followerContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.followerName}>{item.name}</Text>
            <TouchableOpacity
                style={[
                    styles.followButton,
                    item.isFollowing ? styles.followingButton : styles.notFollowingButton,
                ]}
                onPress={() => toggleFollow(item.id)}
            >
                <Text style={item.isFollowing ? styles.followingText : styles.notFollowingText}>
                    {item.isFollowing ? 'Siguiendo' : 'Seguir'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Cabecera con campo de búsqueda y contador de usuarios */}
            <View style={styles.header}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar seguidores"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <Text style={styles.followerCount}>seguidores: {filteredFollowers.length} usuarios</Text>
            </View>

            {/* Lista de seguidores */}
            <FlatList
                data={filteredFollowers}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorManager.getColor('lightBg'),
        paddingTop: 100,
    },
    header: {
        marginBottom: 16,
    },
    searchInput: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    followerCount: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left',
    },
    followerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 1, // Para sombra en Android
        shadowColor: '#000', // Para sombra en iOS
        shadowOpacity: 0.1, // Sombra en iOS
        shadowRadius: 5, // Sombra en iOS
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    followerName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    followButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    followingButton: {
        backgroundColor: '#D3D3D3',
    },
    notFollowingButton: {
        backgroundColor: '#FFA500',
    },
    followingText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    notFollowingText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

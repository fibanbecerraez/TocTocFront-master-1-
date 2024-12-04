import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Linking } from 'react-native';
import Divider from './Divider';

interface adProps {
    commerceImage: string;
    commercePost: string;
    commerce: string;
    url: string;
}

const Ads: React.FC<adProps> = ({
    commerceImage,
    commercePost,
    commerce,
    url,
}) => {


    const handlePress = () => {
        if (url) {
            Linking.openURL(url).catch(err => console.error("Error al abrir el enlace:", err));
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <Image source={{ uri: commerceImage }} style={styles.commerceImage} />
                <View style={styles.content}>
                    <Text style={styles.name}>{commerce}</Text>
                    <Image source={{ uri: commercePost }} style={styles.commercePost} />
                    <Divider />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e8ed',
    },
    commercePost: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
    },
    commerceImage: {
        width: 50,
        height: 50,
        borderRadius: 25, // Máscara circular
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
        marginBottom: 5,
    },
});

export default Ads;

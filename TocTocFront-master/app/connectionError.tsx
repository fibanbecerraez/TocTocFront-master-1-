import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import ColorManager from '../utils/ColorManager';
import { useTranslation } from 'react-i18next';

const ConnectionError = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('internet_error_title')}</Text>
            <LottieView
                source={require('../assets/lottie_network_error.json')}
                autoPlay
                loop
                style={styles.lottie}
                resizeMode="contain"
            />
            <Text style={styles.subtitle}>{t('internet_error_description')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColorManager.getColor('lightBg'),
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    lottie: {
        width: 452,
        height: 245,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: ColorManager.getColor('black'),
        textAlign: 'center',
    },
});

export default ConnectionError;

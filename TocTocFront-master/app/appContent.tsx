import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import AppButton from '../components/AppButton';
import ColorManager from '../utils/ColorManager';
import Spacer from '../components/Spacer';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { getToken } from '../config/authToken';
import { useNetwork } from '../utils/NetworkContext';
import ConnectionError from './connectionError';

const { width } = Dimensions.get('window');
const imageWidth = width - 100;

const AppContent = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [token, setToken] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const isConnected = useNetwork();

    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
            setIsReady(true);
        };
        fetchToken();
    }, []);

    useEffect(() => {
        if (!isReady || !isConnected) return;

        if (token === null || token === '') {
            console.log('sin token');
        } else {
            router.replace('/homeScreen');
            console.log('Token:', token);
        }
    }, [token, isReady, isConnected, router]);

    const navigateToLogin = () => {
        router.push('/login');
    };

    const navigateToSignup = () => {
        router.push('/signup');
    };

    if (!isConnected) {
        return <ConnectionError />;
    }

    return (
        <View style={styles.container}>
            <Spacer />
            <Image style={styles.image} source={require('../assets/adaptive-icon.png')} />
            <Spacer />
            <AppButton title={t('login')} styleType="primary" onPress={navigateToLogin} />
            <View style={{ height: 10 }} />
            <AppButton title={t('register')} styleType="secondary" onPress={navigateToSignup} />
            <View style={{ height: 10 }} />
            <Text style={styles.disclaimer}>{t('terms_and_conditions')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: ColorManager.getColor('main'),
    },
    image: {
        height: undefined,
        width: imageWidth,
        aspectRatio: 1,
        marginHorizontal: 50,
        alignSelf: 'center',
    },
    disclaimer: {
        textAlign: 'center',
        paddingHorizontal: 30,
        fontSize: 10,
    },
});

export default AppContent;

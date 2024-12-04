import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import ColorManager from '../utils/ColorManager';

type ToastStyle = "failure" | "success" | string;

interface ToastProps {
    message: string;
    visible: boolean;
    toastStyle: ToastStyle;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, visible, toastStyle, onClose }) => {
    const [animation] = useState(new Animated.Value(-100));

    useEffect(() => {
        if (visible) {
            Animated.timing(animation, {
                toValue: 10,
                duration: 300,
                useNativeDriver: true,
            }).start();

            // Timer para cerrar automáticamente
            const timer = setTimeout(() => {
                closeToast();
            }, 8000);

            // Borrar timer si se dismissea manualmente
            return () => clearTimeout(timer);
        }
    }, [visible, animation]);

    const closeToast = () => {
        Animated.timing(animation, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
        }).start(() => onClose()); // Llamamos al callback onClose después de la animación
    };

    if (!visible) return null;

    return (
        <Animated.View style={[styles.toast, toastStyleTypes[toastStyle], { transform: [{ translateY: animation }] }]}>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeToast}>
                <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        backgroundColor: ColorManager.getColor('red'),
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000,
    },
    message: {
        color: ColorManager.getColor('white'),
        fontSize: 16,
        flex: 1,
    },
    closeButton: {
        marginLeft: 10,
    },
    closeButtonText: {
        color: ColorManager.getColor('white'),
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const toastStyleTypes = StyleSheet.create({
    failure: {
        backgroundColor: ColorManager.getColor('red'),
        color: ColorManager.getColor('white')
    },
    success: {
        backgroundColor: ColorManager.getColor('green'),
        color: ColorManager.getColor('white')
    },
});

export default Toast;

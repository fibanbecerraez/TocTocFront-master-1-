import React from 'react';
import ColorManager from '../utils/ColorManager';
import { View, TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

type ButtonStyle = 'primary' | 'secondary' | 'normal';

interface ButtonComponentProps {
    title: string;
    styleType: ButtonStyle;
    icon?: any;
    onPress: (event: GestureResponderEvent) => void;
}

const AppButton: React.FC<ButtonComponentProps> = ({ title, styleType, icon, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyles[styleType].button]}
            onPress={onPress}
        >
            <View style={styles.content}>
                <Text style={[styles.text, buttonStyles[styleType].text]}>{title}</Text>
                {icon && <FontAwesome name={icon} size={20} style={styles.icon} />}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 30,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        paddingHorizontal: 6
    },
});

const buttonStyles = {
    primary: StyleSheet.create({
        button: { backgroundColor: ColorManager.getColor('accentMain') },
        text: { color: ColorManager.getColor('white') }
    }),
    secondary: StyleSheet.create({
        button: { backgroundColor: ColorManager.getColor('white') },
        text: { color: ColorManager.getColor('accentMain') }
    }),
    normal: StyleSheet.create({
        button: { backgroundColor: ColorManager.getColor('buttonMain') },
        text: { color: ColorManager.getColor('black') }
    }),
};

export default AppButton;

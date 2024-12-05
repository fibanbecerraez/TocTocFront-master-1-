import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import ColorManager from '../utils/ColorManager';

interface TextFieldProps {
    value: string;
    title: string;
    placeholder: string;
    secureTextEntry?: boolean;
    mandatory?: boolean;
    onChangeText: (text: string) => void;
    validationRegex?: RegExp;
    errorMessage?: string;
}

const TextField: React.FC<TextFieldProps> = ({ value, title, placeholder, secureTextEntry, mandatory, onChangeText, validationRegex, errorMessage }) => {
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (validationRegex) {
            setIsValid(validationRegex.test(value) || value === '');
        } else {
            setIsValid(true);
        }
    }, [value, validationRegex]);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {mandatory && <Text style={styles.mandatory}>*</Text>}
            </View>
            <TextInput
                style={[styles.input, !isValid && value !== '' && styles.invalidInput]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry ?? false}
                autoCapitalize='none'
                placeholderTextColor={ColorManager.getColor('placeholderGray')}
            />
            {!isValid && value !== '' && errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        position: 'relative'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        marginBottom: 8,
        color: ColorManager.getColor('black'),
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    mandatory: {
        color: ColorManager.getColor('red'),
        fontSize: 16,
        marginLeft: 4,
    },
    input: {
        height: 55,
        paddingHorizontal: 10,
        backgroundColor: ColorManager.getColor('white'),
        borderRadius: 10,
        fontSize: 12,
        color: ColorManager.getColor('black'),
        borderColor: ColorManager.getColor('clear'),
        borderWidth: 0
    },
    invalidInput: {
        borderColor: ColorManager.getColor('red'),
        borderWidth: 1
    },
    errorText: {
        color: ColorManager.getColor('red'),
        fontSize: 12,
        marginTop: 4,
    }
});

export default TextField;

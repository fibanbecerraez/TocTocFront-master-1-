import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import ColorManager from '../utils/ColorManager';
import Icon from 'react-native-vector-icons/Ionicons';

interface DropdownPickerProps {
    title: string;
    options: string[];
    selectedValue: string | null;
    mandatory?: boolean;
    onValueChange: (value: string) => void;
}

const DropdownPicker: React.FC<DropdownPickerProps> = ({ title, options, selectedValue, mandatory, onValueChange }) => {
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleSelect = (value: string) => {
        onValueChange(value);
        setPickerVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {mandatory && <Text style={styles.mandatory}>*</Text>}
            </View>
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setPickerVisible(true)}
            >
                <Text style={styles.selectedValue}>
                    {selectedValue || 'Seleccionar...'}
                </Text>
                <Icon name="chevron-down" size={20} color={ColorManager.getColor('placeholderGray')} />
            </TouchableOpacity>

            <Modal
                visible={isPickerVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setPickerVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.pickerContainer}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    title: {
        marginBottom: 8,
        color: ColorManager.getColor('black'),
        fontSize: 16,
    },
    mandatory: {
        color: ColorManager.getColor('red'),
        fontSize: 16,
        marginLeft: 2,
        marginTop: -2,
    },
    dropdown: {
        height: 55,
        paddingHorizontal: 10,
        backgroundColor: ColorManager.getColor('white'),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: ColorManager.getColor('clear'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedValue: {
        fontSize: 14,
        color: ColorManager.getColor('black'),
    },
    modalContainer: {
        flex: 1,
        backgroundColor: ColorManager.getColor('clear'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        width: '80%',
        backgroundColor: ColorManager.getColor('white'),
        borderRadius: 10,
        paddingVertical: 20,
        maxHeight: '50%',
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 16,
        color: ColorManager.getColor('black'),
    },
});

export default DropdownPicker;

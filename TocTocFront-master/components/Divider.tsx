import React from 'react';
import { View, StyleSheet } from 'react-native';
import ColorManager from '../utils/ColorManager';

const Divider = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: ColorManager.getColor('accentBlue'),
        marginVertical: 18,
        marginHorizontal: 30,
    },
});

export default Divider;

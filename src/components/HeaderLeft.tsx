import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const HeaderLeft = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <TouchableOpacity onPress={toggleTheme} style={[styles.iconButton, isDark && styles.iconButtonDark]}>
            <Ionicons name={isDark ? "sunny" : "moon"} size={22} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
    },
    iconButtonDark: {
        backgroundColor: '#333',
    },
});

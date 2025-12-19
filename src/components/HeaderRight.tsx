import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

export const HeaderRight = () => {
    const { isDark, toggleTheme } = useTheme();
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'uz' ? 'ru' : 'uz';
        i18n.changeLanguage(nextLang);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleLanguage} style={[styles.iconButton, styles.langButton, isDark && styles.iconButtonDark]}>
                <Text style={styles.langText}>{i18n.language === 'uz' ? '🇷🇺' : '🇺🇿'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
        gap: 12,
    },
    iconButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonDark: {
        backgroundColor: '#333',
    },
    langButton: {
        width: 42,
    },
    langText: {
        fontSize: 18,
    },
});

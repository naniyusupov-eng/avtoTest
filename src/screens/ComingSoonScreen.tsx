import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const ComingSoonScreen = () => {
    const { isDark } = useTheme();
    const { t } = useTranslation();

    return (
        <ScreenLayout edges={['bottom']}>
            <View style={styles.container}>
                <View style={[styles.iconContainer, isDark && styles.iconContainerDark]}>
                    <Ionicons name="time-outline" size={64} color="#007AFF" />
                </View>
                <Text style={[styles.title, isDark && styles.textWhite]}>
                    {t('coming_soon') || 'Tez orada'}
                </Text>
                <Text style={[styles.subtitle, isDark && styles.textGray]}>
                    {t('coming_soon_desc') || 'Ushbu boʻlim ustida ishlamoqdamiz'}
                </Text>
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#007AFF15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconContainerDark: {
        backgroundColor: '#007AFF25',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    textWhite: {
        color: '#FFF',
    },
    textGray: {
        color: '#AAA',
    },
});

export default ComingSoonScreen;

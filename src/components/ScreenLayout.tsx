import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

interface ScreenLayoutProps {
    children: React.ReactNode;
    style?: any;
    showBackButton?: boolean;
    edges?: Edge[];
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, style, showBackButton, edges = ['top', 'bottom', 'left', 'right'] }) => {
    const { isDark, toggleTheme } = useTheme();
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'uz' ? 'ru' : 'uz';
        i18n.changeLanguage(nextLang);
    };

    return (
        <SafeAreaView edges={edges} style={[styles.container, isDark && styles.containerDark]}>
            <StatusBar style={isDark ? "light" : "dark"} />

            {showBackButton && (
                <View style={styles.topBar}>
                    {/* Left side: Back button or Spacer */}
                    <View style={styles.topLeft}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Ionicons name="chevron-back" size={28} color={isDark ? "#fff" : "#007AFF"} />
                            <Text style={[styles.backText, { color: isDark ? "#fff" : "#007AFF" }]}>{t('back')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <View style={[styles.content, style]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerDark: {
        backgroundColor: '#1a1a1a',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 50,
        zIndex: 10,
    },
    topLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonDark: {
        backgroundColor: '#333',
    },
    langButton: {
        width: 45, // Slightly wider for flag
    },
    langText: {
        fontSize: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 17,
        marginLeft: -2,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        paddingHorizontal: 0,
    },
});

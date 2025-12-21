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
    style?: any; // Content style
    containerStyle?: any; // Root style
    showBackButton?: boolean;
    title?: string;
    edges?: Edge[];
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, style, containerStyle, showBackButton, title, edges = ['top', 'bottom', 'left', 'right'] }) => {
    const { isDark } = useTheme();
    const navigation = useNavigation();
    const { t } = useTranslation();

    // Standard background colors
    const defaultBg = isDark ? '#1C1C1E' : '#F7F8FA';
    const containerBg = containerStyle?.backgroundColor || defaultBg;

    return (
        <SafeAreaView edges={edges} style={[styles.container, containerStyle, { backgroundColor: containerBg }]}>
            <StatusBar style={isDark ? "light" : "dark"} />

            {(showBackButton || title) && (
                <View style={[styles.topBar, isDark && styles.topBarDark]}>
                    <TouchableOpacity
                        style={styles.headerLeft}
                        onPress={() => showBackButton ? navigation.goBack() : {}}
                        disabled={!showBackButton}
                    >
                        {showBackButton && (
                            <Ionicons name="chevron-back" size={24} color={isDark ? '#FFF' : '#000'} />
                        )}
                    </TouchableOpacity>

                    <View style={styles.headerTitleContainer}>
                        <Text style={[styles.headerTitle, isDark && styles.textWhite]}>{title}</Text>
                    </View>

                    <View style={styles.headerRight} />
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
        backgroundColor: '#F7F8FA', // Default
    },
    containerDark: {
        backgroundColor: '#1C1C1E',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    topBarDark: {
        backgroundColor: 'transparent',
    },
    headerLeft: {
        width: 40,
        alignItems: 'flex-start',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    headerRight: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 0,
    },
    textWhite: {
        color: '#FFF',
    },
});

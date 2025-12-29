import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';

interface ScreenLayoutProps {
    children: React.ReactNode;
    style?: any; // Content style
    containerStyle?: any; // Root style
    showBackButton?: boolean;
    title?: string;
    edges?: Edge[];
    headerRight?: React.ReactNode;
    onSearch?: (text: string) => void;
    backLabel?: string;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, style, containerStyle, showBackButton, title, edges = ['top', 'bottom', 'left', 'right'], onSearch, headerRight, backLabel }) => {
    const { isDark } = useTheme();
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [isSearchVisible, setSearchVisible] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');

    // Standard background colors
    const defaultBg = isDark ? '#0F172A' : '#F0F4F8'; // Deep Slate vs Cool Gray
    const containerBg = containerStyle?.backgroundColor || defaultBg;

    const handleSearch = (text: string) => {
        setSearchText(text);
        if (onSearch) onSearch(text);
    };

    const toggleSearch = () => {
        if (isSearchVisible) {
            // Clear on close
            handleSearch('');
            setSearchVisible(false);
        } else {
            setSearchVisible(true);
        }
    };

    return (
        <SafeAreaView edges={edges} style={[styles.container, containerStyle, { backgroundColor: containerBg }]}>
            <StatusBar style={isDark ? "light" : "dark"} />

            {(showBackButton || title || onSearch || headerRight) && (
                <View style={[styles.topBar, isDark && styles.topBarDark]}>
                    <TouchableOpacity
                        style={styles.headerLeft}
                        onPress={() => {
                            if (showBackButton) {
                                Haptics.selectionAsync();
                                navigation.goBack();
                            }
                        }}
                        disabled={!showBackButton}
                    >
                        {showBackButton && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="chevron-back" size={28} color={isDark ? '#FFF' : '#007AFF'} />
                                {backLabel && (
                                    <Text style={{ fontSize: 17, color: isDark ? '#FFF' : '#007AFF', marginLeft: -4 }}>{backLabel}</Text>
                                )}
                            </View>
                        )}
                    </TouchableOpacity>

                    <View style={styles.headerTitleContainer}>
                        <Text style={[styles.headerTitle, isDark && styles.textWhite]}>{title}</Text>
                    </View>

                    <View style={styles.headerRight}>
                        {headerRight}
                        {onSearch && !headerRight && (
                            <TouchableOpacity onPress={() => { Haptics.selectionAsync(); toggleSearch(); }} style={styles.iconButton}>
                                <Ionicons name={isSearchVisible ? "close" : "search"} size={24} color={isDark ? '#FFF' : '#141E30'} />
                            </TouchableOpacity>
                        )}
                        {/* If both headerRight and Search exist, render both? For now priority to headerRight or Search if simple */}
                        {onSearch && headerRight && (
                            <TouchableOpacity onPress={() => { Haptics.selectionAsync(); toggleSearch(); }} style={[styles.iconButton, { marginLeft: 8 }]}>
                                <Ionicons name={isSearchVisible ? "close" : "search"} size={24} color={isDark ? '#FFF' : '#141E30'} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}

            {isSearchVisible && (
                <View style={[styles.searchContainer, isDark && styles.searchContainerDark]}>
                    <View style={[styles.searchInputWrapper, isDark && styles.searchInputWrapperDark]}>
                        <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
                        <TextInput
                            style={[styles.searchInput, isDark && styles.searchInputDark]}
                            placeholder={t('search', 'Qidirish...')}
                            placeholderTextColor="#8E8E93"
                            value={searchText}
                            onChangeText={handleSearch}
                            autoFocus={true}
                            returnKeyType="search"
                        />
                        {searchText.length > 0 && (
                            <TouchableOpacity onPress={() => handleSearch('')}>
                                <Ionicons name="close-circle" size={18} color="#8E8E93" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}

            <View style={[styles.content, style]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

// Add import TextInput
import { TextInput } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8', // Cool Gray
    },
    containerDark: {
        backgroundColor: '#0F172A',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: 'transparent',
        zIndex: 10,
    },
    topBarDark: {
        backgroundColor: 'transparent',
    },
    headerLeft: {
        minWidth: 40, // Allow growth for label
        alignItems: 'flex-start',
        zIndex: 5,
    },
    headerTitleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A202C', // Gray 900 for sharper reading
    },
    headerRight: {
        width: 40,
        alignItems: 'flex-end',
    },
    iconButton: {
        padding: 4,
    },
    content: {
        flex: 1,
        paddingHorizontal: 0,
    },
    textWhite: {
        color: '#FFF',
    },
    // Search Styles
    searchContainer: {
        paddingHorizontal: 16,
        paddingBottom: 10,
        backgroundColor: 'transparent',
    },
    searchContainerDark: {
        backgroundColor: 'transparent',
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E5EA',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 36,
    },
    searchInputWrapperDark: {
        backgroundColor: '#3A3A3C',
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        fontSize: 17,
        color: '#000',
        padding: 0, // Reset
    },
    searchInputDark: {
        color: '#FFF',
    },
});

import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';

const CHAPTERS = Array.from({ length: 29 }, (_, i) => ({ id: i + 1, key: `chapter_${i + 1}` }));

const RuleItem = ({ item, index, navigation, t, isDark }: any) => {
    // Animation
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            delay: index * 10,
            useNativeDriver: true,
        }).start();
    }, []);

    // Random 'time' for aesthetic (e.g., '>' or actual time if we had it)
    // We'll use a chevron for now.

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity
                style={[styles.msgRow, isDark && styles.msgRowDark]}

                onPress={() => {
                    Haptics.selectionAsync();
                    navigation.navigate('RuleDetail', { chapterId: item.id });
                }}
            >
                {/* Avatar / Icon Spot */}
                <View style={[styles.avatar, { backgroundColor: isDark ? '#1E293B' : '#E5E5EA' }]}>
                    <Ionicons name="document-text" size={22} color={isDark ? '#94A3B8' : '#8E8E93'} />
                </View>

                {/* Content */}
                <View style={[styles.msgContent, isDark && styles.msgContentBorderDark]}>
                    <View style={styles.msgHeader}>
                        <Text style={[styles.senderName, isDark && styles.textWhite]} numberOfLines={2}>
                            {t(item.key)}
                        </Text>
                        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" style={{ marginLeft: 8 }} />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export const RulesScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [filterText, setFilterText] = useState('');

    const filteredChapters = CHAPTERS.filter(item => {
        const title = t(item.key).toLowerCase();
        return title.includes(filterText.toLowerCase()) || item.id.toString().includes(filterText);
    });

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('rules')} // "Messages" style title
            showBackButton={true}
            backLabel={t('home')}
            onSearch={setFilterText}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#FFF' }} // Slate / White
        >
            <FlatList
                data={filteredChapters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <RuleItem
                        item={item}
                        index={index}
                        navigation={navigation}
                        t={t}
                        isDark={isDark}
                    />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, isDark && styles.textWhite]}>
                            {t('nothing_found', 'Hech narsa topilmadi')}
                        </Text>
                    </View>
                }
            />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingVertical: 10,
        paddingBottom: 120, // Ensure last item visible
    },
    msgRow: {
        flexDirection: 'row',
        paddingLeft: 16,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    msgRowDark: {
        backgroundColor: 'transparent', // Matches Screen BG
    },
    avatar: {
        width: 50, // Larger
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        backgroundColor: '#E5E5EA', // Light mode Gray 5
    },
    msgContent: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#C6C6C8',
        paddingVertical: 20, // Taller rows
        paddingRight: 16,
    },
    msgContentBorderDark: {
        borderBottomColor: '#334155', // Slate Separator
    },
    msgHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    senderName: {
        fontSize: 18, // Larger font
        fontWeight: '600',
        color: '#000',
        flex: 1,
    },
    textWhite: {
        color: '#E2E8F0', // Soft White
    },
    emptyContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#8E8E93',
    },
});

export default RulesScreen;

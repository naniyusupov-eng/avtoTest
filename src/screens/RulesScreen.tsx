import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const CHAPTERS = Array.from({ length: 29 }, (_, i) => ({ id: i + 1, key: `chapter_${i + 1}` }));

const RuleGridItem = ({ item, index, navigation, t, isDark }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            delay: index * 20,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={{ opacity: fadeAnim, width: '31%', margin: '1%', marginBottom: 12 }}>
            <TouchableOpacity
                style={[styles.gridCard, isDark && styles.gridCardDark]}
                onPress={() => {
                    Haptics.selectionAsync();
                    navigation.navigate('RuleDetail', { chapterId: item.id });
                }}
            >
                <View style={[styles.gridIconContainer, { backgroundColor: isDark ? '#334155' : '#F1F5F9' }]}>
                    <Ionicons name="book" size={24} color={isDark ? '#FFF' : '#334155'} />
                </View>

                <Text style={[styles.gridLabel, isDark && styles.textWhite]} numberOfLines={3}>
                    {t(item.key)}
                </Text>
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
            title={t('rules')}
            showBackButton={true}
            backLabel={t('home')}
            onSearch={setFilterText}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        >
            <ScrollView
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
            >
                <View style={styles.gridContainer}>
                    {filteredChapters.map((item, index) => (
                        <RuleGridItem
                            key={item.id}
                            item={item}
                            index={index}
                            navigation={navigation}
                            t={t}
                            isDark={isDark}
                        />
                    ))}
                </View>

                {filteredChapters.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, isDark && styles.textWhite]}>
                            {t('nothing_found', 'Hech narsa topilmadi')}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingVertical: 16,
        paddingBottom: 120,
        paddingHorizontal: 8,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    gridCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 140,
        width: '100%',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    gridCardDark: {
        backgroundColor: '#1E293B',
        shadowColor: '#000',
        shadowOpacity: 0.2,
    },
    gridIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    gridLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#334155',
        textAlign: 'center',
        lineHeight: 16,
    },
    textWhite: {
        color: '#E2E8F0',
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

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const MARKING_CATEGORIES = [
    { id: 'horizontal_markings', titleKey: 'horizontal_markings', icon: 'remove', color: '#141E30' },
    { id: 'vertical_markings', titleKey: 'vertical_markings', icon: 'reorder-two', color: '#5856D6' },
];

export const MarkingsScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [filterText, setFilterText] = useState('');

    const filteredCategories = MARKING_CATEGORIES.filter(c =>
        t(c.titleKey).toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('road_markings', 'Yoʻl chiziqlari')}
            onSearch={setFilterText}
        >
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {filteredCategories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[styles.categoryCard, isDark && styles.cardDark]}
                        onPress={() => navigation.navigate('SignsList', { categoryId: category.id, title: t(category.titleKey) })}
                    >
                        <View style={[styles.iconBox, { backgroundColor: `${category.color}15` }]}>
                            <Ionicons name={category.icon as any} size={24} color={category.color} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.categoryTitle, isDark && styles.textWhite]}>
                                {t(category.titleKey)}
                            </Text>
                            <Ionicons name="chevron-forward" size={20} color={isDark ? "#555" : "#CCC"} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#1E293B',
        shadowOpacity: 0.3,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1C1C1E',
        flex: 1,
        paddingRight: 8,
    },
    textWhite: {
        color: '#FFF',
    },
});

export default MarkingsScreen;

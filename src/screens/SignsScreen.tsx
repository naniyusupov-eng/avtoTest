import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const SIGN_CATEGORIES = [
    { id: 'warning', titleKey: 'warning_signs', icon: 'warning', color: '#FF9500' },
    { id: 'priority', titleKey: 'priority_signs', icon: 'chevron-up-circle', color: '#FF3B30' },
    { id: 'prohibiting', titleKey: 'prohibiting_signs', icon: 'ban', color: '#FF3B30' },
    { id: 'mandatory', titleKey: 'mandatory_signs', icon: 'arrow-forward-circle', color: '#007AFF' },
    { id: 'information', titleKey: 'information_signs', icon: 'information-circle', color: '#007AFF' },
    { id: 'service', titleKey: 'service_signs', icon: 'business', color: '#34C759' },
    { id: 'additional', titleKey: 'additional_signs', icon: 'add-circle', color: '#8E8E93' },
    { id: 'temporary', titleKey: 'temporary_signs', icon: 'construct', color: '#FFCC00' },
    { id: 'traffic_lights', titleKey: 'traffic_lights_signals', icon: 'stopwatch', color: '#34C759' },
    { id: 'vehicle', titleKey: 'vehicle_signs', icon: 'car', color: '#5856D6' },
    { id: 'danger', titleKey: 'danger_signs', icon: 'flash', color: '#FF9500' },
];

const MARKING_CATEGORIES = [
    { id: 'horizontal_markings', titleKey: 'horizontal_markings', icon: 'remove', color: '#007AFF' },
    { id: 'vertical_markings', titleKey: 'vertical_markings', icon: 'reorder-two', color: '#5856D6' },
];

export const SignsScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [filterText, setFilterText] = useState('');

    const filterCategories = (categories: typeof SIGN_CATEGORIES) => {
        return categories.filter(c => t(c.titleKey).toLowerCase().includes(filterText.toLowerCase()));
    };

    const filteredSignCategories = filterCategories(SIGN_CATEGORIES);
    const filteredMarkingCategories = filterCategories(MARKING_CATEGORIES);

    const renderCategory = (item: any) => (
        <TouchableOpacity
            key={item.id}
            style={[styles.categoryCard, isDark && styles.cardDark]}
            onPress={() => navigation.navigate('SignsList', { categoryId: item.id, title: t(item.titleKey) })}
        >
            <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon as any} size={24} color={item.color} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.categoryTitle, isDark && styles.textWhite]}>
                    {t(item.titleKey)}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={isDark ? "#555" : "#CCC"} />
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('signs')}
            onSearch={setFilterText}
        >
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {filteredSignCategories.length > 0 && (
                    <>
                        <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('road_signs')}</Text>
                        {filteredSignCategories.map(renderCategory)}
                    </>
                )}

                {filteredSignCategories.length > 0 && filteredMarkingCategories.length > 0 && (
                    <View style={styles.divider} />
                )}

                {filteredMarkingCategories.length > 0 && (
                    <>
                        <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('road_markings')}</Text>
                        {filteredMarkingCategories.map(renderCategory)}
                    </>
                )}

                {filteredSignCategories.length === 0 && filteredMarkingCategories.length === 0 && (
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
    container: {
        padding: 16,
        paddingBottom: 100,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 16,
        marginTop: 8,
        marginLeft: 4,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#2C2C2E',
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
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 12,
        opacity: 0.5,
    },
    textWhite: {
        color: '#FFF',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#8E8E93',
        textAlign: 'center',
    },
});

export default SignsScreen;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
    { id: 'traffic_lights', titleKey: 'traffic_lights_signals', icon: 'traffic-cone', color: '#34C759' },
    { id: 'vehicle', titleKey: 'vehicle_signs', icon: 'car', color: '#5856D6' },
    { id: 'danger', titleKey: 'danger_signs', icon: 'flash', color: '#FF9500' },
];

export const SignsDetailScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    return (
        <ScreenLayout edges={['left', 'right']}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {SIGN_CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[styles.categoryCard, isDark && styles.categoryCardDark]}
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
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    categoryCardDark: {
        backgroundColor: '#1C1C1E',
        shadowOpacity: 0.2,
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

export default SignsDetailScreen;

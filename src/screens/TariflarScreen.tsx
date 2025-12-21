import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const PLANS = [
    {
        id: 'weekly',
        titleKey: 'weekly_plan',
        price: '19,000',
        suffixKey: 'per_week',
        features: ['feature_full_access', 'feature_no_ads'],
        gradient: ['#4c669f', '#3b5998'] as const,
        icon: 'calendar-outline' as const,
    },
    {
        id: 'monthly',
        titleKey: 'monthly_plan',
        price: '39,000',
        suffixKey: 'per_month',
        features: ['feature_full_access', 'feature_no_ads', 'feature_exam'],
        gradient: ['#007AFF', '#5856D6'] as const,
        icon: 'star' as const,
        badge: 'MASHHUR', // Can be translated if separate key needed, but user asked for specific layout
        popular: true,
    },
    {
        id: 'yearly',
        titleKey: 'yearly_plan',
        price: '79,000',
        suffixKey: 'per_year',
        features: ['feature_full_access', 'feature_no_ads', 'feature_exam', 'feature_offline', 'feature_support'],
        gradient: ['#FF9500', '#FF2D55'] as const,
        icon: 'diamond' as const,
        badgeKey: 'best_value',
        popular: true,
    },
];

export const TariflarScreen = () => {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('tariflar')}
            showBackButton={true}
        >
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {PLANS.map((plan) => (
                    <View key={plan.id} style={styles.planWrapper}>
                        {plan.popular && (
                            <View style={[styles.popularBadge, plan.id === 'yearly' ? styles.bestValueBadge : null]}>
                                <Text style={styles.popularText}>
                                    {plan.badgeKey ? t(plan.badgeKey) : (plan.badge || 'POPULAR')}
                                </Text>
                            </View>
                        )}
                        <LinearGradient
                            colors={plan.gradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.planCard}
                        >
                            <View style={styles.planHeader}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name={plan.icon} size={32} color="#FFF" />
                                </View>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.planTitle}>
                                        {t(plan.titleKey)}
                                    </Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.price}>{plan.price}</Text>
                                        <Text style={styles.currency}>{t(plan.suffixKey)}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.featuresContainer}>
                                {plan.features.map((feature, idx) => (
                                    <View key={idx} style={styles.featureRow}>
                                        <View style={styles.checkContainer}>
                                            <Ionicons name="checkmark" size={18} color="#34C759" />
                                        </View>
                                        <Text style={styles.featureText}>
                                            {t(feature)}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>
                                    {t('select_plan')}
                                </Text>
                                <Ionicons name="arrow-forward" size={20} color="#FFF" />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                ))}
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        paddingTop: 40, // Added padding top for badges
    },
    planWrapper: {
        marginBottom: 32,
        position: 'relative',
    },
    popularBadge: {
        position: 'absolute',
        top: -12,
        right: 24,
        backgroundColor: '#FFD700',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 12,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    bestValueBadge: {
        backgroundColor: '#32D74B', // Green for best value
    },
    popularText: {
        fontSize: 11,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    planCard: {
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    planHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    titleContainer: {
        flex: 1,
    },
    planTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 6,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFF',
    },
    currency: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginLeft: 6,
    },
    featuresContainer: {
        marginBottom: 24,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    checkContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    featureText: {
        fontSize: 15,
        color: '#FFF',
        lineHeight: 22,
        flex: 1,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        marginRight: 8,
    },
});

export default TariflarScreen;

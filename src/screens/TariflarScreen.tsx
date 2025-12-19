import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const PLANS = [
    { id: 'free', titleKey: 'free_plan', price: '0', features: ['basic_features', 'limited_access'] },
    { id: 'premium', titleKey: 'premium_plan', price: '29,000', features: ['all_features', 'unlimited_access', 'no_ads'] },
    { id: 'vip', titleKey: 'vip_plan', price: '49,000', features: ['all_premium', 'priority_support', 'exclusive_content'] },
];

export const TariflarScreen = () => {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    return (
        <ScreenLayout edges={['left', 'right']}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={[styles.header, isDark && styles.textWhite]}>
                    {t('choose_plan') || 'Rejangizni tanlang'}
                </Text>

                {PLANS.map((plan, index) => (
                    <View key={plan.id} style={[styles.planCard, isDark && styles.cardDark]}>
                        <View style={styles.planHeader}>
                            <Text style={[styles.planTitle, isDark && styles.textWhite]}>
                                {t(plan.titleKey) || plan.titleKey}
                            </Text>
                            <View style={styles.priceContainer}>
                                <Text style={[styles.price, isDark && styles.textWhite]}>{plan.price}</Text>
                                <Text style={styles.currency}> sum/oy</Text>
                            </View>
                        </View>

                        <View style={styles.featuresContainer}>
                            {plan.features.map((feature, idx) => (
                                <View key={idx} style={styles.featureRow}>
                                    <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                                    <Text style={[styles.featureText, isDark && styles.textWhite]}>
                                        {t(feature) || feature}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={[styles.button, plan.id === 'premium' && styles.buttonPremium]}
                        >
                            <Text style={styles.buttonText}>
                                {t('select_plan') || 'Tanlash'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 24,
        textAlign: 'center',
    },
    planCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardDark: {
        backgroundColor: '#1C1C1E',
        shadowOpacity: 0.3,
    },
    planHeader: {
        marginBottom: 20,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: 32,
        fontWeight: '800',
        color: '#007AFF',
    },
    currency: {
        fontSize: 16,
        color: '#8E8E93',
    },
    featuresContainer: {
        marginBottom: 20,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureText: {
        fontSize: 15,
        color: '#1C1C1E',
        marginLeft: 12,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonPremium: {
        backgroundColor: '#34C759',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: '600',
    },
    textWhite: {
        color: '#FFF',
    },
});

export default TariflarScreen;

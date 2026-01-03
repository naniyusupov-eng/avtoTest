import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const CATEGORIES = [
    {
        id: 'ads',
        title: 'Reklamani o\'chirish',
        icon: 'notifications-off' as const,
        gradient: ['#3500E5', '#240099'] as const,
    },
    {
        id: 'comments',
        title: 'Izohlarni ko\'rish',
        icon: 'chatbubbles' as const,
        gradient: ['#F59E0B', '#D97706'] as const,
    }
];

const PLANS: Record<string, any[]> = {
    ads: [
        { id: '30', price: '29 000', suffix: 'so\'m / 30 kun' },
        { id: '60', price: '39 000', suffix: 'so\'m / 60 kun' },
        { id: '90', price: '49 000', suffix: 'so\'m / 90 kun' },
        { id: '120', price: '59 000', suffix: 'so\'m / 120 kun', badge: 'ENG FOYDALI' },
    ],
    comments: [
        { id: '60', price: '39 000', suffix: 'so\'m / 60 kun' },
        { id: '120', price: '59 000', suffix: 'so\'m / 120 kun', badge: 'TAVSIYA' },
    ]
};

export const TariflarScreen = () => {
    const { t } = useTranslation();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('tariflar')}
            showBackButton={true}
        >
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {CATEGORIES.map((cat) => (
                    <View key={cat.id} style={styles.cardWrapper}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => toggleExpand(cat.id)}
                            style={styles.touchable}
                        >
                            <LinearGradient
                                colors={cat.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.card}
                            >
                                <View style={styles.header}>
                                    <View style={styles.iconBox}>
                                        <Ionicons name={cat.icon} size={28} color="#FFF" />
                                    </View>
                                    <View style={styles.headerText}>
                                        <Text style={styles.title}>{cat.title}</Text>
                                    </View>
                                    <Ionicons
                                        name={expandedId === cat.id ? "chevron-up" : "chevron-down"}
                                        size={24}
                                        color="rgba(255,255,255,0.8)"
                                    />
                                </View>

                                {expandedId === cat.id && (
                                    <View style={styles.plansList}>
                                        <View style={styles.divider} />
                                        {PLANS[cat.id].map((plan: any) => (
                                            <TouchableOpacity key={plan.id} style={styles.planItem}>
                                                <View style={styles.planInfo}>
                                                    <Text style={styles.planPrice}>{plan.price}</Text>
                                                    <Text style={styles.planSuffix}>{plan.suffix}</Text>
                                                </View>
                                                {plan.badge ? (
                                                    <View style={[styles.badge, plan.badge === 'ENG FOYDALI' ? styles.badgeGreen : styles.badgeGold]}>
                                                        <Text style={styles.badgeText}>{plan.badge}</Text>
                                                    </View>
                                                ) : (
                                                    <Ionicons name="arrow-forward" size={20} color="rgba(255,255,255,0.5)" />
                                                )}
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    cardWrapper: {
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    touchable: {
        borderRadius: 20,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        overflow: 'hidden'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 4,
    },
    desc: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
    },
    plansList: {
        marginTop: 20,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 16,
    },
    planItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    planInfo: {
        flexDirection: 'column',
    },
    planPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
    },
    planSuffix: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 2,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    badgeGreen: {
        backgroundColor: '#10B981',
    },
    badgeGold: {
        backgroundColor: '#F59E0B',
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#FFF',
        textTransform: 'uppercase',
    }
});

export default TariflarScreen;

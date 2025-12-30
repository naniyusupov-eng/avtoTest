import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const AnimatedCounter = ({ value, style }: { value: number, style?: any }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: value,
            duration: 2000,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
        }).start();

        const listener = animatedValue.addListener(({ value }) => {
            setDisplayValue(Math.floor(value));
        });

        return () => {
            animatedValue.removeAllListeners();
        };
    }, [value]);

    return <Text style={style}>{displayValue}%</Text>;
};

export default function StatisticsScreen({ navigation }: any) {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    const [stats] = useState({
        total: 12,
        passed: 8,
        failed: 4,
        score: 82,
        streak: 5
    });

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 10,
                tension: 40,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    // Compact Stat Row Item
    const CompactStatItem = ({ icon, label, value, color, bgColor, delay }: any) => {
        const scale = useRef(new Animated.Value(0.9)).current;
        const opacity = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 600,
                    delay: delay,
                    useNativeDriver: true
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    delay: delay,
                    friction: 8,
                    useNativeDriver: true
                })
            ]).start();
        }, []);

        return (
            <Animated.View style={[
                styles.compactItem,
                {
                    backgroundColor: isDark ? '#1E293B' : bgColor,
                    opacity,
                    transform: [{ scale }]
                }
            ]}>
                <View style={[styles.compactBefore, { backgroundColor: color }]} />
                <View style={[styles.compactIconBox, { backgroundColor: `${color}15` }]}>
                    <Ionicons name={icon} size={18} color={color} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.compactLabel}>{label}</Text>
                    <Text style={[styles.compactValue, isDark && styles.textWhite]}>{value}</Text>
                </View>
            </Animated.View>
        );
    };

    return (
        <ScreenLayout
            title={t('statistics', 'Statistika')}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

                    {/* Main Score Card */}
                    <TouchableOpacity activeOpacity={0.9} onPress={() => Haptics.selectionAsync()}>
                        <LinearGradient
                            colors={isDark ? ['#3B82F6', '#1E40AF'] : ['#4F46E5', '#3B82F6']}
                            style={styles.mainCard}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View style={styles.mainCardContent}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.mainCardLabel}>{t('general_result')}</Text>
                                    <AnimatedCounter value={stats.score} style={styles.mainCardScore} />
                                    <View style={styles.tagContainer}>
                                        <Ionicons name="trending-up" size={14} color="#FFF" />
                                        <Text style={styles.tagText}>{t('very_good_result')}</Text>
                                    </View>
                                </View>
                                <View style={styles.artContainer}>
                                    <View style={[styles.softRing, { width: 120, height: 120, opacity: 0.1 }]} />
                                    <View style={[styles.softRing, { width: 90, height: 90, opacity: 0.2 }]} />
                                    <Ionicons name="pie-chart" size={56} color="#FFF" style={{ opacity: 0.9 }} />
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Compact Activity Grid (2x2 but smaller/horizontal focus) */}

                    <View style={styles.compactGrid}>
                        <CompactStatItem
                            icon="checkmark-circle"
                            label={t('passed')}
                            value={stats.passed}
                            color="#10B981"
                            bgColor="#F0FDF4"
                            delay={100}
                        />
                        <CompactStatItem
                            icon="close-circle"
                            label={t('failed_count')}
                            value={stats.failed}
                            color="#EF4444"
                            bgColor="#FEF2F2"
                            delay={200}
                        />
                        <CompactStatItem
                            icon="layers"
                            label={t('total_tests')}
                            value={stats.total}
                            color="#6366F1"
                            bgColor="#EEF2FF"
                            delay={300}
                        />
                        <CompactStatItem
                            icon="flame"
                            label={t('daily_streak')}
                            value={stats.streak}
                            color="#F59E0B"
                            bgColor="#FFFBEB"
                            delay={400}
                        />
                    </View>

                    {/* Mistakes Analysis Button */}
                    <TouchableOpacity
                        style={[styles.mistakesCard, { backgroundColor: isDark ? '#1E293B' : '#FFF' }]}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        }}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#EF4444', '#F87171']}
                            style={styles.mistakesIconBox}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons name="construct" size={24} color="#FFF" />
                        </LinearGradient>

                        <View style={{ flex: 1, marginLeft: 16 }}>
                            <Text style={[styles.mistakesTitle, isDark && styles.textWhite]}>{t('work_on_mistakes')}</Text>
                            <Text style={styles.mistakesSubtitle}>{t('review_mistakes')}</Text>
                        </View>

                        <View style={[styles.arrowBox, { backgroundColor: isDark ? '#334155' : '#F3F4F6' }]}>
                            <Ionicons name="arrow-forward" size={20} color={isDark ? '#CBD5E1' : '#4B5563'} />
                        </View>
                    </TouchableOpacity>

                </Animated.View>
            </ScrollView>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 24,
        paddingBottom: 140,
    },
    mainCard: {
        borderRadius: 32,
        padding: 24,
        marginBottom: 24, // Reduced margin
        shadowColor: "#4F46E5",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 24,
        elevation: 8,
    },
    mainCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
    },
    mainCardLabel: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 6,
    },
    mainCardScore: {
        fontSize: 52,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 12,
    },
    tagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    tagText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    artContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    softRing: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: '#FFF',
    },
    sectionHeading: {
        fontSize: 16, // Smaller heading
        fontWeight: '700',
        color: '#64748B', // Softer color
        marginBottom: 12,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    // Compact Grid
    compactGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12, // Tighter gap
        marginBottom: 24,
    },
    compactItem: {
        width: (width - 48 - 12) / 2, // 2 column, tighter
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12, // Reduced padding
        borderRadius: 16, // Slightly smaller radius
        overflow: 'hidden',
        position: 'relative',
        // Minimal shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 1,
    },
    compactBefore: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4, // Colored indicator strip
    },
    compactIconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 12,
    },
    compactLabel: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
        marginBottom: 2,
    },
    compactValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    textWhite: {
        color: '#FFF',
    },
    mistakesCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16, // Reduced padding for mistakes too to match compact feel? No, keep it prominent but slim.
        borderRadius: 24,
        shadowColor: "#EF4444",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
    },
    mistakesIconBox: {
        width: 48, // Smaller
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ rotate: '-5deg' }]
    },
    mistakesTitle: {
        fontSize: 16, // Smaller
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 2,
    },
    mistakesSubtitle: {
        fontSize: 12,
        color: '#64748B',
        lineHeight: 16,
    },
    arrowBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

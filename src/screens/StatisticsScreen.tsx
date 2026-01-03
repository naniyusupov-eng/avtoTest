import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Pressable, Animated, Easing, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    const [stats, setStats] = useState({
        total: 0,
        passed: 0,
        failed: 0,
        score: 0,
        streak: 0,
        today: 0
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const stored = await AsyncStorage.getItem('tickets_progress');
                if (stored) {
                    const progress = JSON.parse(stored);
                    const values: any[] = Object.values(progress);

                    const passed = values.filter(v => v.status === 'completed').length; // Corrected status check
                    const failed = values.filter(v => v.status === 'failed' || v.status === 'in_progress').length;
                    const total = values.length;

                    // Today calculation
                    const todayStart = new Date().setHours(0, 0, 0, 0);
                    const todayCount = values.filter(v => v.lastOpened && v.lastOpened >= todayStart).length;

                    // Simple score
                    let sumScore = 0;
                    let countScore = 0;
                    values.forEach(v => {
                        if (v.score !== undefined && (v.score + v.wrong) > 0) {
                            // v.score is correct count. Total is score+wrong if not saved explicitly
                            // Better: v.score / 20 * 100? Assuming 20 q.
                            // Actually, logic was: correctCount / totalCount.
                            // Let's stick to simple average if available or just use passed %?
                            // User asked for specific 4 stats below results. Main score logic can stay as is (lines 68-77).
                        }
                        if (v.status === 'completed') sumScore += 100; // Simplified score logic based on status if detailed score missing
                        // Preserving original logic approximately:
                    });
                    // Re-reading original logic:
                    // v.correctCount / v.totalCount. 
                    // I will restore original logic for score but fix the status check strings if needed.
                    // Original used v.status === 'passed'. But TicketDetail saves 'completed' (Line 286).
                    // I should fix that match.

                    // Correct Score Logic:
                    // New Score Logic: Percentage of tickets passed out of 120
                    const score = Math.round((passed / 120) * 100);

                    setStats(prev => ({ ...prev, total, passed, failed, score, today: todayCount }));
                }
            } catch (e) {
                console.log('Error loading stats:', e);
            }
        };

        const unsubscribe = navigation.addListener('focus', loadStats);
        loadStats();

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

        return unsubscribe;
    }, [navigation]);



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
                    <Pressable onPress={() => Haptics.selectionAsync()} style={({ pressed }) => pressed && { opacity: 0.9 }}>
                        <LinearGradient
                            colors={['#3500E5', '#240099']}
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
                    </Pressable>

                    {/* Detailed Stats Grid */}
                    <View style={styles.compactGrid}>
                        <View style={[styles.compactItem, { backgroundColor: isDark ? '#1E293B' : '#FFF' }]}>
                            <View style={[styles.compactIconBox, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
                                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                            </View>
                            <View>
                                <Text style={styles.compactLabel}>{t('passed_tickets', 'O\'tilgan')}</Text>
                                <Text style={[styles.compactValue, isDark && styles.textWhite]}>{stats.passed}</Text>
                            </View>
                        </View>
                        <View style={[styles.compactItem, { backgroundColor: isDark ? '#1E293B' : '#FFF' }]}>
                            <View style={[styles.compactIconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                                <Ionicons name="close-circle" size={20} color="#EF4444" />
                            </View>
                            <View>
                                <Text style={styles.compactLabel}>{t('failed_tickets', 'O\'tilmagan')}</Text>
                                <Text style={[styles.compactValue, isDark && styles.textWhite]}>{stats.failed}</Text>
                            </View>
                        </View>
                        <View style={[styles.compactItem, { backgroundColor: isDark ? '#1E293B' : '#FFF' }]}>
                            <View style={[styles.compactIconBox, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                                <Ionicons name="calendar" size={20} color="#F59E0B" />
                            </View>
                            <View>
                                <Text style={styles.compactLabel}>{t('opened_today', 'Bugun')}</Text>
                                <Text style={[styles.compactValue, isDark && styles.textWhite]}>{stats.today}</Text>
                            </View>
                        </View>
                        <View style={[styles.compactItem, { backgroundColor: isDark ? '#1E293B' : '#FFF' }]}>
                            <View style={[styles.compactIconBox, { backgroundColor: 'rgba(99, 102, 241, 0.1)' }]}>
                                <Ionicons name="albums" size={20} color="#6366F1" />
                            </View>
                            <View>
                                <Text style={styles.compactLabel}>{t('total_opened', 'Umumiy')}</Text>
                                <Text style={[styles.compactValue, isDark && styles.textWhite]}>{stats.total}</Text>
                            </View>
                        </View>
                    </View>
                    <Pressable
                        style={({ pressed }) => [
                            styles.mistakesCard,
                            { backgroundColor: isDark ? '#1E293B' : '#FFF' },
                            pressed && { opacity: 0.8 }
                        ]}
                        onPress={async () => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            try {
                                const stored = await AsyncStorage.getItem('mistake_registry');
                                if (stored) {
                                    const registry = JSON.parse(stored);
                                    const mistakeQuestions = Object.values(registry)
                                        .filter((item: any) => item.count >= 3)
                                        .map((item: any) => item.question);

                                    if (mistakeQuestions.length > 0) {
                                        navigation.navigate('TicketDetail', {
                                            ticketNumber: 'MISTAKES',
                                            mode: 'mistakes',
                                            customQuestions: mistakeQuestions
                                        });
                                    } else {
                                        Alert.alert(t('info', 'Malumot'), t('no_mistakes', 'Sizda 3 marta va undan ko\'p xato qilingan savollar yo\'q.'));
                                    }
                                } else {
                                    Alert.alert(t('info', 'Malumot'), t('no_mistakes', 'Sizda xatolar tarixi yo\'q.'));
                                }
                            } catch (e) {
                                console.error(e);
                            }
                        }}
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
                    </Pressable>



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
        borderRadius: 20,
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
        borderRadius: 20, // Standardized
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
        borderRadius: 20,
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

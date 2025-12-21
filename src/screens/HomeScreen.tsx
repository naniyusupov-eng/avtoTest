import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, Image } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const HomeScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Entry Animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 6,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const QUICK_ACTIONS = [
        { id: 'mistakes', title: t('mistakes', 'Xatolarim'), icon: 'alert-circle', color: '#FF3B30' },
        { id: 'favorites', title: t('favorites', 'Tanlanganlar'), icon: 'heart', color: '#FF9500' },
        { id: 'history', title: t('history', 'Tarix'), icon: 'time', color: '#5856D6' },
        { id: 'random', title: t('random', 'Tasodifiy'), icon: 'shuffle', color: '#34C759' },
    ];

    const renderQuickAction = (item: any, index: number) => (
        <TouchableOpacity
            key={item.id}
            style={[styles.actionCard, isDark && styles.cardDark]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ComingSoon', { title: item.title })}
        >
            <View style={[styles.iconCircle, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={[styles.actionTitle, isDark && styles.textWhite]}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('home')} // Or custom header
            showBackButton={false}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Greeting Section */}
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
                    <Text style={[styles.greeting, isDark && styles.textWhite]}>
                        {t('good_day', 'Xayrli kun, Haydovchi!')}
                    </Text>
                    <Text style={styles.subGreeting}>
                        {t('keep_learning', 'Bugun yana 20 ta savol yechamizmi?')}
                    </Text>
                </Animated.View>

                {/* Hero / Exam Card */}
                <AnimatedTouchable
                    style={[
                        styles.heroCardContainer,
                    ]}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('Tickets')} // Redirect to tickets or specific Exam screen
                >
                    <LinearGradient
                        colors={isDark ? ['#141E30', '#243B55'] : ['#141E30', '#243B55']} // Dark Blue Theme
                        style={styles.heroGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View>
                            <Text style={styles.heroTitle}>{t('start_exam', 'Imtihonni Boshlash')}</Text>
                            <Text style={styles.heroSubtitle}>{t('exam_desc', '20 daqiqa, 20 savol')}</Text>
                        </View>
                        <View style={styles.playButton}>
                            <Ionicons name="play" size={24} color="#141E30" />
                        </View>

                        {/* Background Decoration */}
                        <Ionicons name="speedometer-outline" size={120} color="rgba(255,255,255,0.05)" style={styles.heroBgIcon} />
                    </LinearGradient>
                </AnimatedTouchable>

                {/* Stats Row */}
                <Animated.View
                    style={[styles.statsRow, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
                >
                    <View style={[styles.statCard, isDark && styles.cardDark]}>
                        <Text style={[styles.statValue, { color: '#007AFF' }]}>12</Text>
                        <Text style={styles.statLabel}>{t('solved_today', 'Bugun yechildi')}</Text>
                    </View>
                    <View style={[styles.statCard, isDark && styles.cardDark]}>
                        <Text style={[styles.statValue, { color: '#34C759' }]}>85%</Text>
                        <Text style={styles.statLabel}>{t('average_score', 'O‘rtacha natija')}</Text>
                    </View>
                </Animated.View>

                {/* Quick Actions Grid */}
                <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('quick_actions', 'Tezkor bo‘limlar')}</Text>
                <Animated.View style={[styles.actionsGrid, { opacity: fadeAnim }]}>
                    {QUICK_ACTIONS.map((action, index) => renderQuickAction(action, index))}
                </Animated.View>

                {/* Daily Tip (Static Idea) */}
                <View style={[styles.tipCard, isDark && styles.cardDark]}>
                    <View style={styles.tipHeader}>
                        <Ionicons name="bulb" size={20} color="#FFcc00" />
                        <Text style={[styles.tipTitle, isDark && styles.textWhite]}>{t('daily_tip', 'Kun maslahati')}</Text>
                    </View>
                    <Text style={styles.tipText}>
                        {t('tip_text', 'Yo‘l harakati qoidalariga rioya qilish xavfsizlik garovidir. Piyodalar o‘tish joyida ehtiyot bo‘ling.')}
                    </Text>
                </View>

            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginTop: 10,
    },
    subGreeting: {
        fontSize: 16,
        color: '#8E8E93',
        marginTop: 4,
        marginBottom: 24,
    },
    textWhite: {
        color: '#FFF',
    },
    // Hero Card
    heroCardContainer: {
        marginBottom: 24,
        shadowColor: '#141E30',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    heroGradient: {
        borderRadius: 24,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 140,
        position: 'relative',
        overflow: 'hidden',
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
    },
    playButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    heroBgIcon: {
        position: 'absolute',
        right: -20,
        bottom: -20,
        opacity: 0.1,
    },
    // Stats Row
    statsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#2C2C2E',
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#8E8E93',
        textAlign: 'center',
    },
    // Quick Actions
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 16,
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24,
    },
    actionCard: {
        width: (width - 40 - 16) / 2, // 2 columns
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1C1E',
    },
    // Tip Card
    tipCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#FFcc00',
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginLeft: 8,
    },
    tipText: {
        fontSize: 14,
        color: '#636366',
        lineHeight: 20,
    },
});

export default HomeScreen;

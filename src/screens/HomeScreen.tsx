import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const COLUMN_GAP = 12;
const CARD_WIDTH = (width - 32 - COLUMN_GAP) / 2;

export const HomeScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const insets = useSafeAreaInsets();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.spring(slideAnim, { toValue: 0, friction: 8, useNativeDriver: true })
        ]).start();
    }, []);

    const BG_LIGHT = '#F8FAFC'; // Slate 50
    const BG_DARK = '#0B1120'; // Midnight

    const EXAM_MODES = [
        {
            id: 'exam20',
            title: t('exam'),
            subtitle: t('questions_20'),
            icon: 'reader',
            gradient: isDark ? ['#3B82F6', '#1D4ED8'] : ['#2563EB', '#1E40AF'], // Blue
            route: 'TicketDetail',
            params: { ticketNumber: 'MIX', mode: 'exam20' }
        },
        {
            id: 'exam10',
            title: t('mini_test'),
            subtitle: t('questions_10'),
            icon: 'flash',
            gradient: isDark ? ['#10B981', '#059669'] : ['#10B981', '#047857'], // Emerald
            route: 'TicketDetail',
            params: { ticketNumber: 'MINI', mode: 'exam10' }
        },
        {
            id: 'marathon',
            title: t('marathon'),
            subtitle: t('infinite'),
            icon: 'infinite',
            gradient: isDark ? ['#8B5CF6', '#7C3AED'] : ['#8B5CF6', '#6D28D9'], // Purple
            route: 'TicketDetail',
            params: { ticketNumber: 'INF', mode: 'marathon' }
        },
        {
            id: 'exam50',
            title: t('big_test'),
            subtitle: t('questions_50'),
            icon: 'layers',
            gradient: isDark ? ['#F59E0B', '#D97706'] : ['#F59E0B', '#B45309'], // Amber
            route: 'TicketDetail',
            params: { ticketNumber: 'MAX', mode: 'exam50' }
        },
    ];

    const renderHeader = () => (
        <View style={styles.header}>
            <View>
                <Text style={[styles.brandText, isDark && styles.textWhite]}>AvtoTest</Text>
            </View>
        </View>
    );

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title=""
            containerStyle={{ backgroundColor: isDark ? BG_DARK : BG_LIGHT }}
            headerRight={null}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>

                    {renderHeader()}

                    {/* Exam Modes Grid */}
                    {/* Exam Modes Grid */}
                    <View style={styles.gridRowWrap}>
                        {EXAM_MODES.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.examCard}
                                activeOpacity={0.8}
                                onPress={() => {
                                    Haptics.selectionAsync();
                                    navigation.navigate(item.route, item.params);
                                }}
                            >
                                <LinearGradient
                                    colors={item.gradient as any}
                                    style={styles.examGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <View style={styles.examIconCircle}>
                                        <Ionicons name={item.icon as any} size={24} color={item.gradient[1]} />
                                    </View>
                                    <View>
                                        <Text style={styles.examTitle}>{item.title}</Text>
                                        <Text style={styles.examSubtitle}>{item.subtitle}</Text>
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>


                    {/* Thematic Tests Card */}
                    <TouchableOpacity
                        style={{ marginBottom: 24, borderRadius: 24, overflow: 'hidden', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 }}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('ThematicTests')}
                    >
                        <LinearGradient
                            colors={isDark ? ['#0891B2', '#155E75'] : ['#06B6D4', '#0891B2']} // Cyan
                            style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: '700', color: '#FFF', marginBottom: 4 }}>{t('thematic_tests')}</Text>
                                <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>{t('thematic_desc')}</Text>
                            </View>
                            <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name="library" size={24} color="#FFF" />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Theory Section */}
                    <View style={styles.gridRow}>
                        {/* Signs Card */}
                        <TouchableOpacity
                            style={[styles.boxCard, isDark ? styles.boxDark : styles.boxLight]}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('Signs')}
                        >
                            <View style={[styles.iconCircle, { backgroundColor: '#FFF0E6' }]}>
                                <Ionicons name="warning" size={28} color="#FF9500" />
                            </View>
                            <View>
                                <Text style={[styles.boxTitle, isDark && styles.textWhite]}>{t('signs')}</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Rules Card */}
                        <TouchableOpacity
                            style={[styles.boxCard, isDark ? styles.boxDark : styles.boxLight]}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('Rules')}
                        >
                            <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
                                <Ionicons name="book" size={28} color="#0EA5E9" />
                            </View>
                            <View>
                                <Text style={[styles.boxTitle, isDark && styles.textWhite]}>{t('rules')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* Utility Section */}
                    {/* Utility Section */}
                    <View style={[styles.wideCard, isDark ? styles.boxDark : styles.boxLight]}>
                        <View style={styles.statRow}>
                            {/* Mistakes / Statistics */}
                            <TouchableOpacity style={styles.statItem} activeOpacity={0.7} onPress={() => navigation.navigate('Statistics')}>
                                <View style={[styles.statIconBox, { backgroundColor: '#FEE2E2' }]}>
                                    <Ionicons name="stats-chart" size={24} color="#EF4444" />
                                </View>
                                <Text style={[styles.statLabel, isDark && styles.textWhite]}>{t('statistics', 'Statistika')}</Text>
                            </TouchableOpacity>
                            <View style={[styles.dividerVertical, { backgroundColor: isDark ? '#334155' : '#E2E8F0' }]} />
                            {/* Saved */}
                            <TouchableOpacity style={styles.statItem} activeOpacity={0.7} onPress={() => navigation.navigate('Saved')}>
                                <View style={[styles.statIconBox, { backgroundColor: '#FFFBEB' }]}>
                                    <Ionicons name="bookmark" size={24} color="#F59E0B" />
                                </View>
                                <Text style={[styles.statLabel, isDark && styles.textWhite]}>{t('saved', 'Saqlanganlar')}</Text>
                            </TouchableOpacity>
                            <View style={[styles.dividerVertical, { backgroundColor: isDark ? '#334155' : '#E2E8F0' }]} />
                            {/* History */}
                            <TouchableOpacity style={styles.statItem} activeOpacity={0.7} onPress={() => navigation.navigate('ComingSoon', { title: t('history') })}>
                                <View style={[styles.statIconBox, { backgroundColor: '#ede9fe' }]}>
                                    <Ionicons name="time" size={24} color="#8b5cf6" />
                                </View>
                                <Text style={[styles.statLabel, isDark && styles.textWhite]}>{t('history')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Animated.View>
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        padding: 16,
        paddingBottom: 120, // Clear floating Tab Bar
    },
    // Header
    header: {
        flexDirection: 'row', // Just Row, logo left, profile right
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    brandText: {
        fontSize: 26,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    textWhite: {
        color: '#FFF',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 16,
    },
    // Exam Grid
    gridRowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: COLUMN_GAP,
        marginBottom: 24,
    },
    examCard: {
        width: CARD_WIDTH,
        height: 110,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    examGradient: {
        flex: 1,
        borderRadius: 20,
        padding: 16,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    examIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    examTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
        marginTop: 8,
    },
    examSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.9)',
    },
    // Theory Grid
    gridRow: {
        flexDirection: 'row',
        gap: COLUMN_GAP,
        marginBottom: 24,
    },
    boxCard: {
        width: CARD_WIDTH,
        height: 120,
        borderRadius: 24,
        padding: 16,
        justifyContent: 'space-between',
        // Minimal Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    boxLight: {
        backgroundColor: '#FFFFFF',
    },
    boxDark: {
        backgroundColor: '#1E293B',
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1E293B',
        marginTop: 8,
    },
    boxSubtitle: {
        fontSize: 12,
        color: '#94A3B8',
        fontWeight: '500',
    },
    // Wide Card
    wideCard: {
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statIconBox: {
        width: 44,
        height: 44,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1E293B',
    },
    dividerVertical: {
        width: 1,
        height: 40,
        backgroundColor: '#E2E8F0',
    },
});

export default HomeScreen;

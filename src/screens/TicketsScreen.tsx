import React, { useRef, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, FlatList, Animated, Alert } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 4;
const GRID_PADDING = 16;
const GAP = 12;
const AVAILABLE_WIDTH = width - (GRID_PADDING * 2) - (GAP * (COLUMN_COUNT - 1));
const TICKET_ITEM_SIZE = AVAILABLE_WIDTH / COLUMN_COUNT;

export const TicketsScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const tickets = Array.from({ length: 120 }, (_, i) => i + 1);

    // Progress State
    const [solvedTickets, setSolvedTickets] = useState<number[]>([1, 2, 3]);
    const [filterText, setFilterText] = useState('');

    // Determine next ticket automatically
    const currentTicket = solvedTickets.length + 1;
    const progress = solvedTickets.length / 120;

    const filteredTickets = tickets.filter(t => t.toString().includes(filterText));

    // Animations
    const fillAnim = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        useCallback(() => {
            fillAnim.setValue(0);
            Animated.timing(fillAnim, {
                toValue: progress,
                duration: 1000,
                delay: 200,
                useNativeDriver: false,
            }).start();
        }, [progress])
    );

    const handleReset = () => {
        Alert.alert(
            t('reset_progress', 'Natijani tozalash'),
            t('reset_confirm', 'Barcha natijalar ochib ketadi. Davom etasizmi?'),
            [
                { text: t('cancel', 'Bekor qilish'), style: 'cancel' },
                {
                    text: t('reset', 'Tozalash'),
                    style: 'destructive',
                    onPress: () => setSolvedTickets([])
                }
            ]
        );
    };

    const renderTicket = ({ item, index }: { item: number; index: number }) => {
        // Use index for layout if needed, but flex wrap handles it mostly.
        const isLastInRow = (index + 1) % COLUMN_COUNT === 0;
        const isSolved = solvedTickets.includes(item);
        const isCurrent = item === currentTicket;

        return (
            <TouchableOpacity
                style={[
                    styles.ticketItem,
                    isDark && styles.ticketItemDark,
                    isCurrent && (isDark ? styles.ticketCurrentDark : styles.ticketCurrent),
                    !isLastInRow && { marginRight: GAP },
                    { width: TICKET_ITEM_SIZE, height: TICKET_ITEM_SIZE }
                ]}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('TicketDetail', {
                    ticketNumber: item
                })}
            >
                {isSolved && (
                    <View style={styles.statusDotSolved}>
                        <Ionicons name="checkmark" size={10} color="#FFF" />
                    </View>
                )}

                <Text style={[
                    styles.ticketNumber,
                    isDark && styles.textWhite,
                    isSolved && styles.textGreen,
                    isCurrent && styles.textBlue
                ]}>{item}</Text>

            </TouchableOpacity>
        );
    };

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <LinearGradient
                colors={isDark ? ['#1C1C1E', '#2C2C2E'] : ['#007AFF', '#00C7BE']}
                style={[styles.progressCard, isDark && styles.cardDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                {/* Top Row: Title + Reset */}
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.cardTitle}>{t('your_progress')}</Text>
                        <Text style={styles.cardSubtitle}>
                            {solvedTickets.length} / 120 {t('tickets_solved')}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.resetButton}
                        onPress={handleReset}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="trash-outline" size={20} color="rgba(255,255,255,0.9)" />
                    </TouchableOpacity>
                </View>

                {/* Middle: Big Percentage + Bar */}
                <View style={styles.statsContainer}>
                    <Text style={styles.bigPercentage}>
                        {Math.round(progress * 100)}%
                    </Text>
                    <View style={styles.progressBarBg}>
                        <Animated.View style={[
                            styles.progressBarFill,
                            {
                                width: fillAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%']
                                })
                            }
                        ]} />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('tickets')}
            style={styles.container}
            onSearch={setFilterText}
        >
            <FlatList
                data={filteredTickets}
                renderItem={renderTicket}
                keyExtractor={(item) => item.toString()}
                numColumns={COLUMN_COUNT}
                contentContainerStyle={styles.ticketsGrid}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={renderHeader}
            />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    ticketsGrid: {
        padding: GRID_PADDING,
        paddingTop: 0,
        paddingBottom: 100,
    },
    headerContainer: {
        marginTop: 16,
        marginBottom: 20,
    },
    progressCard: {
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 6,
    },
    cardDark: {
        shadowColor: '#000',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        fontWeight: '500',
    },
    resetButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsContainer: {
        marginTop: 8,
    },
    bigPercentage: {
        fontSize: 42,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 12,
        letterSpacing: -1,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#FFF',
        borderRadius: 4,
    },
    ticketItem: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: GAP,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    ticketItemDark: {
        backgroundColor: '#2C2C2E',
        borderColor: '#3A3A3C',
        shadowOpacity: 0.2,
    },
    ticketCurrent: {
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#007AFF',
        shadowColor: '#007AFF',
        shadowOpacity: 0.15,
        elevation: 4,
    },
    ticketCurrentDark: {
        backgroundColor: '#2C2C2E',
        borderWidth: 2,
        borderColor: '#0A84FF',
        shadowColor: '#0A84FF',
        shadowOpacity: 0.3,
        elevation: 4,
    },
    statusDotSolved: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#34C759',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ticketNumber: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    textWhite: {
        color: '#FFF',
    },
    textGreen: {
        color: '#34C759',
    },
    textBlue: {
        color: '#007AFF',
    },
});

export default TicketsScreen;

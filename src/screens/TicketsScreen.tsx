import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

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

    // Mock Progress
    const solvedTickets = [1, 2, 3];
    const currentTicket = 4;
    const progress = solvedTickets.length / 120;

    const renderTicket = ({ item, index }: { item: number; index: number }) => {
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
            {/* Progress Dashboard */}
            <View style={[styles.progressCard, isDark && styles.cardDark]}>
                <View style={styles.progressRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.progressTitle, isDark && styles.textWhite]}>{t('your_progress')}</Text>
                        <Text style={[styles.progressSubtitle, isDark && styles.textGray]}>
                            {solvedTickets.length} / 120 {t('tickets_solved')}
                        </Text>
                    </View>
                    <View style={[styles.circularProgress, isDark && styles.circularProgressDark]}>
                        <Text style={[styles.percentageText, isDark && styles.textWhite]}>{Math.round(progress * 100)}%</Text>
                    </View>
                </View>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
                </View>
            </View>
        </View>
    );

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('tickets')}
            style={styles.container}
        >
            <FlatList
                data={tickets}
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
        // backgroundColor removed to inherit from ScreenLayout (which handles Theme)
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
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    cardDark: {
        backgroundColor: '#2C2C2E',
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    progressSubtitle: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
    },
    circularProgress: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularProgressDark: {
        backgroundColor: '#3A3A3C',
    },
    percentageText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#007AFF',
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#F2F2F7',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#34C759',
        borderRadius: 3,
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
    },
    ticketItemDark: {
        backgroundColor: '#2C2C2E',
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
    textGray: {
        color: '#AEAEB2',
    },
    textGreen: {
        color: '#34C759',
    },
    textBlue: {
        color: '#007AFF',
    },
});

export default TicketsScreen;

import React, { useState } from 'react';
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

    // Mock Rating Data (Replace with real progress later)
    // Randomize stars for demo effect if needed, or keep 0 for unused.
    // For now, let's show empty stars to motivate.

    const [filterText, setFilterText] = useState('');

    const filteredTickets = tickets.filter(t => t.toString().includes(filterText));

    const renderTicket = ({ item, index }: { item: number; index: number }) => {
        const isLastInRow = (index + 1) % COLUMN_COUNT === 0;

        return (
            <TouchableOpacity
                style={[
                    styles.ticketCard,
                    isDark && styles.ticketCardDark,
                    !isLastInRow && { marginRight: GAP },
                    { width: TICKET_ITEM_SIZE, height: TICKET_ITEM_SIZE * 1.2 } // Taller for stars
                ]}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('TicketDetail', { ticketNumber: item })}
            >
                <Text style={[styles.ticketNumber, isDark && styles.textWhite]}>{item}</Text>

                {/* Stars Container */}
                <View style={styles.starsRow}>
                    <Ionicons name="star" size={10} color={isDark ? "#3A3A3C" : "#E5E5EA"} />
                    <Ionicons name="star" size={10} color={isDark ? "#3A3A3C" : "#E5E5EA"} style={{ marginHorizontal: 2 }} />
                    <Ionicons name="star" size={10} color={isDark ? "#3A3A3C" : "#E5E5EA"} />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('tickets')}
            onSearch={setFilterText}
        >
            <FlatList
                data={filteredTickets}
                renderItem={renderTicket}
                keyExtractor={(item) => item.toString()}
                numColumns={COLUMN_COUNT}
                contentContainerStyle={styles.ticketsGrid}
                showsVerticalScrollIndicator={false}
            />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    ticketsGrid: {
        padding: GRID_PADDING,
        paddingTop: 16,
        paddingBottom: 100,
    },
    ticketCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: GAP,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F2F2F7',
        paddingVertical: 8,
    },
    ticketCardDark: {
        backgroundColor: '#2C2C2E',
        borderColor: '#3A3A3C',
        shadowOpacity: 0.3,
    },
    ticketNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: '#141E30',
        marginBottom: 6,
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textWhite: {
        color: '#FFF',
    },
});

export default TicketsScreen;

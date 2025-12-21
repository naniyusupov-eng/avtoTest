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

    const [solvedTickets, setSolvedTickets] = useState<number[]>([1, 2, 3]);
    const [filterText, setFilterText] = useState('');

    const filteredTickets = tickets.filter(t => t.toString().includes(filterText));

    const renderTicket = ({ item, index }: { item: number; index: number }) => {
        const isLastInRow = (index + 1) % COLUMN_COUNT === 0;

        // Notch Color needs to match screen background
        const notchColor = isDark ? '#1C1C1E' : '#F7F8FA';

        return (
            <TouchableOpacity
                style={[
                    styles.ticketItem,
                    isDark && styles.ticketItemDark,
                    !isLastInRow && { marginRight: GAP },
                    { width: TICKET_ITEM_SIZE, height: TICKET_ITEM_SIZE * 1.2 } // Slightly taller
                ]}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('TicketDetail', {
                    ticketNumber: item
                })}
            >
                {/* Notches */}
                <View style={[styles.notch, styles.notchLeft, { backgroundColor: notchColor }]} />
                <View style={[styles.notch, styles.notchRight, { backgroundColor: notchColor }]} />

                {/* Dashed Line */}
                <View style={styles.dashedLine} />

                {/* Content */}
                <View style={styles.contentContainer}>
                    <Text style={[styles.label, isDark && styles.textGray]}>Bilet</Text>
                    <Text style={[
                        styles.ticketNumber,
                        isDark && styles.textWhite
                    ]}>{item}</Text>
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
    ticketItem: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        marginBottom: GAP,
        overflow: 'hidden', // Contain content
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    ticketItemDark: {
        backgroundColor: '#2C2C2E',
    },
    // Notches
    notch: {
        width: 10,
        height: 10,
        borderRadius: 5,
        position: 'absolute',
        top: '65%', // Position near bottom
        zIndex: 1,
    },
    notchLeft: {
        left: -5,
    },
    notchRight: {
        right: -5,
    },
    dashedLine: {
        position: 'absolute',
        top: '65%', // Match notch center (approx)
        left: 10,
        right: 10,
        height: 1,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderStyle: 'dashed',
        borderRadius: 1,
        // Hack for dashed line in RN not always working perfectly with borderStyle:
        // Or simply remove it if it looks bad. Let's try minimal 1px line.
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 4,
    },
    label: {
        fontSize: 10,
        color: '#8E8E93',
        textTransform: 'uppercase',
        marginBottom: 2,
        fontWeight: '600',
    },
    textGray: {
        color: '#636366',
    },
    ticketNumber: {
        fontSize: 26,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    textWhite: {
        color: '#FFF',
    },
});

export default TicketsScreen;

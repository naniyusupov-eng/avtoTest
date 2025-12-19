import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 4;
const GRID_PADDING = 16;
const GAP = 12;
const TICKET_ITEM_SIZE = (width - (GRID_PADDING * 2) - (GAP * (COLUMN_COUNT - 1))) / COLUMN_COUNT;

export const TicketsScreen = ({ navigation }: any) => {
    const { isDark } = useTheme();
    const tickets = Array.from({ length: 120 }, (_, i) => i + 1);

    const renderTicket = ({ item, index }: { item: number; index: number }) => {
        const isLastInRow = (index + 1) % COLUMN_COUNT === 0;

        return (
            <TouchableOpacity
                style={[
                    styles.ticketItem,
                    isDark && styles.ticketItemDark,
                    !isLastInRow && { marginRight: GAP }
                ]}
                onPress={() => navigation.navigate('TicketDetail', { ticketNumber: item })}
            >
                <Text style={[
                    styles.ticketNumber,
                    isDark && styles.textWhite
                ]}>{item}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenLayout edges={['left', 'right']}>
            <FlatList
                data={tickets}
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
    },
    ticketItem: {
        width: TICKET_ITEM_SIZE,
        height: TICKET_ITEM_SIZE,
        backgroundColor: '#FFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: GAP,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    ticketItemDark: {
        backgroundColor: '#2C2C2E',
        shadowOpacity: 0.2,
    },
    ticketNumber: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    textWhite: {
        color: '#FFF',
    },
});

export default TicketsScreen;

import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 4;
const GAP = 10;
const PADDING = 16;
const ITEM_SIZE = (width - (PADDING * 2) - (GAP * (COLUMN_COUNT - 1))) / COLUMN_COUNT;

export const TicketsScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const tickets = Array.from({ length: 120 }, (_, i) => i + 1);

    const renderTicket = ({ item }: { item: number }) => (
        <TouchableOpacity
            style={[styles.card, isDark && styles.cardDark]}
            onPress={() => {
                Haptics.selectionAsync();
                navigation.navigate('TicketDetail', { ticketNumber: item });
            }}
        >
            <Text style={[styles.number, isDark && styles.textWhite]}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <ScreenLayout
            title={t('tickets')}
            showBackButton={false}
            edges={['top', 'left', 'right']}
        >
            <FlatList
                data={tickets}
                renderItem={renderTicket}
                keyExtractor={(item) => item.toString()}
                numColumns={COLUMN_COUNT}
                contentContainerStyle={styles.grid}
                columnWrapperStyle={{ gap: GAP, justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
            />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    grid: {
        padding: PADDING,
        paddingBottom: 100,
    },
    card: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        backgroundColor: '#FFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    cardDark: {
        backgroundColor: '#1E293B',
        borderColor: '#334155',
    },
    number: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1A202C',
    },
    textWhite: {
        color: '#FFF',
    },
});

export default TicketsScreen;

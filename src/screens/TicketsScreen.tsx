import React, { useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 4; // Keep 4 for density, or 3 for comfort. Let's stick to 4 but cleaner.
const GAP = 12;
const PADDING = 16;
const AVAILABLE_WIDTH = width - (PADDING * 2) - (GAP * (COLUMN_COUNT - 1));
const ITEM_SIZE = AVAILABLE_WIDTH / COLUMN_COUNT;

const TICKET_COUNT = 70;

export const TicketsScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [ticketStatuses, setTicketStatuses] = useState<any>({});

    useFocusEffect(
        useCallback(() => {
            const loadStatuses = async () => {
                try {
                    const stored = await AsyncStorage.getItem('tickets_progress');
                    if (stored) {
                        setTicketStatuses(JSON.parse(stored));
                    }
                } catch (e) {
                    console.error(e);
                }
            };
            loadStatuses();
        }, [])
    );

    const tickets = Array.from({ length: TICKET_COUNT }, (_, i) => {
        const id = i + 1;
        const statusData = ticketStatuses[id] || { status: 'new', score: 0, wrong: 0 };
        return { id, ...statusData };
    });

    const filteredTickets = tickets.filter(t => t.id.toString().includes(searchQuery));

    const renderTicket = ({ item }: { item: any }) => {
        // Distinct style for new tickets
        const isNew = item.status === 'new';

        let bgColor, borderColor;
        if (isDark) {
            bgColor = isNew ? '#1E293B' : '#0F172A'; // New: Lighter Slate, Worked: Darker (or vice versa? Let's make New "Inactive" look)
            // Let's try: Worked = Card Color (#1E293B), New = Transparent/Outline or Slightly different
            // Actually user wants "ajralib tursin". 
            // Let's make NEW tickets have a subtle background, and WORKED tickets have "Surface" background.

            // Worked
            if (!isNew) {
                bgColor = '#1E293B';
                borderColor = '#334155';
            } else {
                // New / Untouched
                bgColor = 'transparent'; // Or very dark
                borderColor = '#334155';
            }
        } else {
            // Light Mode
            if (!isNew) {
                bgColor = '#FFFFFF';
                borderColor = 'rgba(0,0,0,0.05)';
            } else {
                bgColor = '#F1F5F9'; // Grayish for new/empty
                borderColor = 'transparent';
            }
        }

        // Override for simplicity and better look based on previous "box" request:
        // Let's use Opacity for differentiation.
        const opacity = isNew ? 0.6 : 1;
        // And maybe Background.
        const finalBg = isDark
            ? (isNew ? '#1E293B' : '#334155') // New=Standard, Worked=Highlighted? Or inverse.
            : (isNew ? '#F8FAFC' : '#FFFFFF');

        return (
            <TouchableOpacity
                onPress={() => {
                    Haptics.selectionAsync();
                    navigation.navigate('TicketDetail', { ticketNumber: item.id });
                }}
                activeOpacity={0.7}
                style={[
                    styles.card,
                    {
                        backgroundColor: finalBg,
                        borderColor: isDark ? '#334155' : 'rgba(0,0,0,0.05)',
                        borderWidth: 1,
                        // Add shadow only if worked
                        elevation: isNew ? 0 : 2,
                        shadowOpacity: isNew ? 0 : 0.05,
                    }
                ]}
            >
                {/* Number fixed in center */}
                <Text style={[styles.number, { color: isDark ? '#F1F5F9' : '#1E293B' }]}>
                    {item.id}
                </Text>

                {/* Stats absolute at bottom */}
                {!isNew && (
                    <View style={{ position: 'absolute', bottom: 8, flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: '#10B981' }}>{item.score}</Text>
                        <View style={{ width: 1, height: 8, backgroundColor: isDark ? '#64748B' : '#CBD5E1' }} />
                        <Text style={{ fontSize: 10, fontWeight: '700', color: '#EF4444' }}>{item.wrong}</Text>
                    </View>
                )}

                {/* Optional: Dot for new? User said "kirilmagan biletlar ajralib tursin". 
                    The background difference (White vs Gray/Slate) should be enough. 
                    Plus 'New' tickets don't have stats at bottom. 
                */}
            </TouchableOpacity>
        );
    };

    return (
        <ScreenLayout
            title={t('tickets')}
            showBackButton={false}
            edges={['top', 'left', 'right']}
            onSearch={setSearchQuery}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        >
            <FlatList
                data={filteredTickets}
                renderItem={renderTicket}
                keyExtractor={(item) => item.id.toString()}
                numColumns={COLUMN_COUNT}
                contentContainerStyle={[styles.grid, { paddingBottom: 120 }]}
                columnWrapperStyle={{ gap: GAP }}
                showsVerticalScrollIndicator={false}
            />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    grid: {
        padding: PADDING,
    },
    card: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: GAP,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardNewLight: {
        backgroundColor: '#FFF',
    },
    cardNewDark: {
        backgroundColor: '#1E293B',
    },
    number: {
        fontSize: 20,
        fontWeight: '700',
    },
    iconContainer: {
        position: 'absolute',
        top: 6,
        right: 6,
    },
    dotNew: {
        position: 'absolute',
        bottom: 8,
        width: 4,
        height: 4,
        borderRadius: 2,
    }
});

export default TicketsScreen;

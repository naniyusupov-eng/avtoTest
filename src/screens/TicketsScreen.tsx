import React, { useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, FlatList, View, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 4;
const GAP = 12;
const PADDING = 16;
const AVAILABLE_WIDTH = width - (PADDING * 2) - (GAP * (COLUMN_COUNT - 1));
const ITEM_SIZE = AVAILABLE_WIDTH / COLUMN_COUNT;

const TICKET_COUNT = 120;

export const TicketsScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    // Removed search query state since it is replaced by Clean action
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

    const handleClearTickets = () => {
        Alert.alert(
            t('reset', 'Tozalash'),
            t('reset_confirm', 'Barcha natijalar ochib ketadi. Davom etasizmi?'),
            [
                { text: t('cancel', 'Bekor qilish'), style: 'cancel' },
                {
                    text: t('reset', 'Tozalash'),
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.setItem('tickets_progress', '{}');
                        setTicketStatuses({});
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    }
                }
            ]
        );
    };

    const renderTicket = ({ item }: { item: any }) => {
        const isNew = !item.status || item.status === 'new';

        let bgColor, borderColor;
        // Logic from previous version
        if (isDark) {
            if (!isNew) {
                bgColor = '#1E293B';
                borderColor = '#334155';
            } else {
                bgColor = 'transparent';
                borderColor = '#334155';
            }
        } else {
            if (!isNew) {
                bgColor = '#FFFFFF';
                borderColor = 'rgba(0,0,0,0.05)';
            } else {
                bgColor = '#F1F5F9';
                borderColor = 'transparent';
            }
        }

        const finalBg = isDark
            ? (isNew ? '#1E293B' : '#334155')
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
                        elevation: isNew ? 0 : 2,
                        shadowOpacity: isNew ? 0 : 0.05,
                    }
                ]}
            >
                <Text style={[styles.number, { color: isDark ? '#F1F5F9' : '#1E293B' }]}>
                    {item.id}
                </Text>

                {!isNew && (
                    <View style={{ position: 'absolute', bottom: 8, flexDirection: 'row', gap: 6, alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, fontWeight: '700', color: '#10B981' }}>{item.score}</Text>
                        <View style={{ width: 1, height: 8, backgroundColor: isDark ? '#64748B' : '#CBD5E1' }} />
                        <Text style={{ fontSize: 10, fontWeight: '700', color: '#EF4444' }}>{item.wrong}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <ScreenLayout
            title={t('tickets')}
            showBackButton={false}
            edges={['top', 'left', 'right']}
            headerRight={
                <Pressable
                    onPress={() => {
                        Haptics.selectionAsync();
                        handleClearTickets();
                    }}
                    hitSlop={8}
                    style={{
                        backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2',
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Ionicons name="trash-outline" size={22} color="#EF4444" />
                </Pressable>
            }
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        >
            <FlatList
                data={tickets}
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
        borderRadius: 20,
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
    number: {
        fontSize: 20,
        fontWeight: '700',
    }
});

export default TicketsScreen;

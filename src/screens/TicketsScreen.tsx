import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, FlatList, View, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 4;
const GAP = 10;
const PADDING = 16;
// Calculate item size based on available width
const AVAILABLE_WIDTH = width - (PADDING * 2) - (GAP * (COLUMN_COUNT - 1));
const ITEM_SIZE = AVAILABLE_WIDTH / COLUMN_COUNT;

const TICKET_COUNT = 70;

// Mock data for ticket status (0: locked/new, 1: in-progress, 2: completed/passed, 3: failed)
const getMockData = (id: number) => {
    if (id === 1) return { status: 'completed', score: 19 };
    if (id === 2) return { status: 'failed', score: 14 };
    if (id === 3) return { status: 'in_progress', score: 5 };
    return { status: 'new', score: 0 };
};

export const TicketsScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    // Scale animation on press
    const [scaleAnims] = useState(() => Array.from({ length: TICKET_COUNT + 1 }, () => new Animated.Value(1)));
    const [searchQuery, setSearchQuery] = useState('');

    const tickets = Array.from({ length: TICKET_COUNT }, (_, i) => {
        const id = i + 1;
        const { status, score } = getMockData(id);
        return { id, status, score };
    });

    const filteredTickets = tickets.filter(t => t.id.toString().includes(searchQuery));

    const onPressIn = (index: number) => {
        Animated.spring(scaleAnims[index], {
            toValue: 0.92,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = (index: number) => {
        Animated.spring(scaleAnims[index], {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const renderTicket = ({ item, index }: { item: any, index: number }) => {
        const getScoreColor = () => {
            switch (item.status) {
                case 'completed': return '#10B981';
                case 'failed': return '#EF4444';
                case 'in_progress': return '#F59E0B';
                default: return isDark ? '#94A3B8' : '#64748B';
            }
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    Haptics.selectionAsync();
                    navigation.navigate('TicketDetail', { ticketNumber: item.id });
                }}
                onPressIn={() => onPressIn(index)}
                onPressOut={() => onPressOut(index)}
                activeOpacity={1}
            >
                <Animated.View style={[
                    styles.cardContainer,
                    { transform: [{ scale: scaleAnims[index] }] }
                ]}>
                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: isDark ? '#1E293B' : '#FFF',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 0
                            }
                        ]}
                    >
                        {item.status === 'new' && (
                            <View style={{ position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#3B82F6' }} />
                        )}

                        <Text style={[styles.number, { color: isDark ? '#F1F5F9' : '#1E293B' }]}>
                            {item.id}
                        </Text>

                        {item.status !== 'new' && (
                            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: isDark ? '#334155' : '#E2E8F0' }}>
                                <View
                                    style={{
                                        height: '100%',
                                        width: `${Math.round((item.score / 20) * 100)}%`,
                                        backgroundColor: ((item.score / 20) * 100) >= 70 ? '#10B981' : (((item.score / 20) * 100) >= 40 ? '#F59E0B' : '#EF4444')
                                    }}
                                />
                            </View>
                        )}
                    </View>
                </Animated.View>
            </TouchableOpacity>
        );
    };


    return (
        <ScreenLayout
            title={t('tickets')}
            showBackButton={false}
            edges={['top', 'left', 'right']}
            onSearch={setSearchQuery}
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
    cardContainer: {
        width: ITEM_SIZE,
        height: ITEM_SIZE * 1.1, // Slightly taller
        marginBottom: GAP,
    },
    card: {
        flex: 1,
        borderRadius: 18, // Smooth rounded corners
        padding: 12,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
        overflow: 'hidden',
    },
    cardDark: {
        borderColor: '#334155', // Slate-700
        shadowOpacity: 0.3,
        shadowColor: '#000',
        backgroundColor: '#1E293B', // Ensure background set if gradient fails or for transparency
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 2,
    },
    number: {
        fontSize: 24,
        fontWeight: '800',
        fontVariant: ['tabular-nums'],
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 2,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 2,
    },
});

export default TicketsScreen;


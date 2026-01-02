import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface SavedQuestion {
    uid: string;
    ticketNumber: number;
    questionId: number;
    text: string;
    timestamp: number;
}

export const SavedScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [savedData, setSavedData] = useState<SavedQuestion[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSaved();
        const unsubscribe = navigation.addListener('focus', loadSaved);
        return unsubscribe;
    }, [navigation]);

    const loadSaved = async () => {
        try {
            const stored = await AsyncStorage.getItem('saved_questions');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Sort by timestamp desc (newest first)
                parsed.sort((a: SavedQuestion, b: SavedQuestion) => b.timestamp - a.timestamp);
                setSavedData(parsed);
            } else {
                setSavedData([]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePress = (item: SavedQuestion) => {
        // Navigate to TicketDetail with specific initial index
        // Note: The questionId is 1-based usually, so index = questionId - 1
        navigation.navigate('TicketDetail', {
            ticketNumber: item.ticketNumber,
            initialIndex: item.questionId - 1,
            mode: 'saved'
        });
    };

    const handleDelete = async (uid: string) => {
        Alert.alert(
            t('confirm_delete', 'Delete?'),
            t('delete_confirm_msg', 'Are you sure you want to remove this saved question?'),
            [
                { text: t('cancel', 'Cancel'), style: 'cancel' },
                {
                    text: t('delete', 'Delete'),
                    style: 'destructive',
                    onPress: async () => {
                        const newData = savedData.filter(i => i.uid !== uid);
                        setSavedData(newData);
                        await AsyncStorage.setItem('saved_questions', JSON.stringify(newData));
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: SavedQuestion }) => (
        <Pressable
            style={[styles.card, { backgroundColor: isDark ? '#1E293B' : '#FFF' }]}
            onPress={() => handlePress(item)}

        >
            <View style={styles.cardHeader}>
                <View style={[styles.badge, { backgroundColor: isDark ? '#334155' : '#EFF6FF' }]}>
                    <Text style={[styles.badgeText, { color: '#3B82F6' }]}>
                        {t('ticket', 'Bilet')} {item.ticketNumber} &bull; {t('question', 'Savol')} {item.questionId}
                    </Text>
                </View>
                <Pressable onPress={() => handleDelete(item.uid)} hitSlop={10}>
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </Pressable>
            </View>

            <Text
                numberOfLines={2}
                style={[styles.questionText, { color: isDark ? '#E2E8F0' : '#1E293B' }]}
            >
                {item.text}
            </Text>

            <View style={styles.cardFooter}>
                <Text style={styles.dateText}>
                    {new Date(item.timestamp).toLocaleDateString()}
                </Text>
                <Ionicons name="chevron-forward" size={16} color={isDark ? '#64748B' : '#94A3B8'} />
            </View>
        </Pressable>
    );

    return (
        <ScreenLayout
            title={t('saved', 'Saqlanganlar')}
            headerRight={
                <View style={{ flexDirection: 'row', gap: 12 }}>
                    {/* Optional: Filter or Clear All */}
                </View>
            }
        >
            {savedData.length === 0 && !isLoading ? (
                <View style={styles.emptyContainer}>
                    <View style={[styles.emptyIcon, { backgroundColor: isDark ? '#334155' : '#F1F5F9' }]}>
                        <Ionicons name="bookmark-outline" size={48} color={isDark ? '#94A3B8' : '#CBD5E1'} />
                    </View>
                    <Text style={[styles.emptyText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                        {t('no_saved_questions', 'Saqlangan savollar yo\'q')}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={savedData}
                    renderItem={renderItem}
                    keyExtractor={item => item.uid}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
        gap: 12,
    },
    card: {
        borderRadius: 20,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
    },
    questionText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: '#94A3B8',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

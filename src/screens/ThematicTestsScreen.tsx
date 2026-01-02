import React from 'react';
import { View, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export const ThematicTestsScreen = ({ navigation }: any) => {
    const { isDark } = useTheme();
    const { t } = useTranslation();

    // Topics now use translation keys
    const topics = [
        { id: '1', titleKey: 'topic_1' },
        { id: '2', titleKey: 'topic_2' },
        { id: '3', titleKey: 'topic_3' },
        { id: '4', titleKey: 'topic_4' },
        { id: '5', titleKey: 'topic_5' },
        { id: '6', titleKey: 'topic_6' },
        { id: '7', titleKey: 'topic_7' },
        { id: '8', titleKey: 'topic_8' },
        { id: '9', titleKey: 'topic_9' },
        { id: '10', titleKey: 'topic_10' },
        { id: '11', titleKey: 'topic_11' },
        { id: '12', titleKey: 'topic_12' },
        { id: '13', titleKey: 'topic_13' },
        { id: '14', titleKey: 'topic_14' },
        { id: '15', titleKey: 'topic_15' },
        { id: '16', titleKey: 'topic_16' },
        { id: '17', titleKey: 'topic_17' },
        { id: '18', titleKey: 'topic_18' },
        { id: '19', titleKey: 'topic_19' },
        { id: '20', titleKey: 'topic_20' },
    ];

    const renderItem = ({ item, index }: { item: any; index: number }) => (
        <Pressable
            style={({ pressed }) => [
                styles.topicCard,
                { backgroundColor: isDark ? '#1E293B' : '#FFF' },
                pressed && { opacity: 0.7 }
            ]}
            onPress={() => {
                Haptics.selectionAsync();
                navigation.navigate('TicketDetail', {
                    ticketNumber: `T-${item.id}`,
                    mode: 'thematic',
                    topicTitle: t(item.titleKey),
                    topicId: item.id
                });
            }}
        >
            <View style={[styles.indexCircle, { backgroundColor: isDark ? '#334155' : '#EFF6FF' }]}>
                <Text style={[styles.indexText, { color: '#3B82F6' }]}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[styles.topicTitle, isDark && styles.textWhite]}>{t(item.titleKey)}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#64748B' : '#94A3B8'} />
        </Pressable>
    );

    return (
        <ScreenLayout
            title={t('thematic_tests')}
            showBackButton={true}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        >
            <FlatList
                data={topics}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
        paddingBottom: 100,
    },
    topicCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    indexCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    indexText: {
        fontSize: 14,
        fontWeight: '700',
    },
    topicTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
        lineHeight: 22,
    },
    textWhite: {
        color: '#FFF',
    },
});

export default ThematicTestsScreen;

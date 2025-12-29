import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, TextInput, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export const ThematicTestsScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Topics - as requested + generated
    const TOPICS = [
        { id: '1', title: 'Umumiy qoidalar' },
        { id: '2', title: 'Haydovchilarning umumiy majburiyatlari' },
        { id: '3', title: 'Piyodalarning majburiyatlari' },
        { id: '4', title: 'Svetafor va tartibga soluvchining ishoralari' },
        { id: '5', title: 'Maxsus ishoralar' },
        { id: '6', title: 'Ogohlantiruvchi ishoralar' },
        { id: '7', title: 'Chorrahalarda harakatlanish' },
        { id: '8', title: 'Quvib o\'tish' },
        { id: '9', title: 'To\'xtash va to\'xtab turish' },
        { id: '10', title: 'Yo\'l harakatini tartibga solish' },
        { id: '11', title: 'Odam tashish' },
        { id: '12', title: 'Yuk tashish' },
        { id: '13', title: 'Velosipedda harakatlanish' },
        { id: '14', title: 'Ot aravada harakatlanish' },
        { id: '15', title: 'Temir yo\'l kesishmalaridan o\'tish' },
        { id: '16', title: 'Aholi punktlaridan o\'tish' },
        { id: '17', title: 'Avtomagistrallarda harakatlanish' },
        { id: '18', title: 'Turar joy dahalarida harakatlanish' },
        { id: '19', title: 'Texnik holat' },
        { id: '20', title: 'Tibbiy yordam ko\'rsatish' },
    ];

    const filteredTopics = TOPICS.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onSearch = (text: string) => {
        setSearchQuery(text);
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <TouchableOpacity
            style={[styles.itemCard, { backgroundColor: isDark ? '#1E293B' : '#FFF' }]}
            activeOpacity={0.7}
            onPress={() => {
                Haptics.selectionAsync();
                // Navigate to test with 'thematic' mode
                navigation.navigate('TicketDetail', {
                    ticketNumber: `T-${item.id}`,
                    mode: 'thematic',
                    topicTitle: item.title,
                    topicId: item.id
                });
            }}
        >
            <View style={styles.itemLeft}>
                <View style={[styles.iconBox, { backgroundColor: isDark ? '#334155' : '#F1F5F9' }]}>
                    <Text style={[styles.indexText, { color: isDark ? '#CBD5E1' : '#64748B' }]}>{index + 1}</Text>
                </View>
                <Text style={[styles.itemText, { color: isDark ? '#FFF' : '#1E293B' }]}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={isDark ? '#64748B' : '#CBD5E1'} />
        </TouchableOpacity>
    );

    return (
        <ScreenLayout
            title="Mavzulashtirilgan Testlar"
            onSearch={onSearch}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        >
            <FlatList
                data={filteredTopics}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
        gap: 12,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 16,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    indexText: {
        fontSize: 14,
        fontWeight: '700',
    },
    itemText: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
    }
});

export default ThematicTestsScreen;

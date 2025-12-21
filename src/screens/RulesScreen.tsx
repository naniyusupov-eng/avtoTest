import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const CHAPTERS = [
    { id: 1, key: 'chapter_1' },
    { id: 2, key: 'chapter_2' },
    { id: 3, key: 'chapter_3' },
    { id: 4, key: 'chapter_4' },
    { id: 5, key: 'chapter_5' },
    { id: 6, key: 'chapter_6' },
    { id: 7, key: 'chapter_7' },
    { id: 8, key: 'chapter_8' },
    { id: 9, key: 'chapter_9' },
    { id: 10, key: 'chapter_10' },
    { id: 11, key: 'chapter_11' },
    { id: 12, key: 'chapter_12' },
    { id: 13, key: 'chapter_13' },
    { id: 14, key: 'chapter_14' },
    { id: 15, key: 'chapter_15' },
    { id: 16, key: 'chapter_16' },
    { id: 17, key: 'chapter_17' },
    { id: 18, key: 'chapter_18' },
    { id: 19, key: 'chapter_19' },
    { id: 20, key: 'chapter_20' },
    { id: 21, key: 'chapter_21' },
    { id: 22, key: 'chapter_22' },
    { id: 23, key: 'chapter_23' },
    { id: 24, key: 'chapter_24' },
    { id: 25, key: 'chapter_25' },
    { id: 26, key: 'chapter_26' },
    { id: 27, key: 'chapter_27' },
    { id: 28, key: 'chapter_28' },
    { id: 29, key: 'chapter_29' },
];

export const RulesScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    const renderChapter = ({ item }: any) => (
        <TouchableOpacity
            style={[styles.chapterCard, isDark && styles.cardDark]}
            onPress={() => {
                navigation.navigate('RuleDetail', {
                    chapterId: item.id
                });
            }}
        >
            <View style={[styles.numberBox, isDark && styles.numberBoxDark]}>
                <Text style={[styles.numberText, isDark && styles.numberTextDark]}>{item.id}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.chapterTitle, isDark && styles.textWhite]}>
                    {t(item.key)}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={isDark ? "#555" : "#CCC"} />
            </View>
        </TouchableOpacity>
    );

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('rules')}
        >
            <FlatList
                data={CHAPTERS}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderChapter}
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
    chapterCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#2C2C2E',
        shadowOpacity: 0.3,
    },
    numberBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#007AFF15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    numberBoxDark: {
        backgroundColor: '#007AFF25',
    },
    numberText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#007AFF',
    },
    numberTextDark: {
        color: '#4A9EFF',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    chapterTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1C1C1E',
        flex: 1,
        paddingRight: 8,
    },
    textWhite: {
        color: '#FFF',
    },
});

export default RulesScreen;

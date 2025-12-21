import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { Text } from '../components/ThemedText';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { RULES_CONTENT } from '../data/rules_content';

export const RuleDetailScreen = () => {
    const route = useRoute();
    const { chapterId } = route.params as { chapterId: number };
    const { t } = useTranslation();
    const { isDark } = useTheme();

    const ruleData = RULES_CONTENT.find(r => r.id === chapterId);

    // Get title from translation
    const title = t(`chapter_${chapterId}`);

    return (
        <ScreenLayout edges={['top', 'left', 'right']} title={t('rules')} showBackButton={true} style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[styles.title, isDark && styles.textWhite]}>{title}</Text>

                <View style={[styles.card, isDark && styles.cardDark]}>
                    <Text style={[styles.content, isDark && styles.textGray]}>
                        {ruleData?.content || t('coming_soon_desc')}
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardDark: {
        backgroundColor: '#1C1C1E',
        shadowOpacity: 0.3,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    textWhite: {
        color: '#FFF',
    },
    textGray: {
        color: '#CCC',
    },
});

export default RuleDetailScreen;

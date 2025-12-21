import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

export default function LanguageScreen({ navigation }: any) {
    const { t, i18n } = useTranslation();
    const { isDark } = useTheme();

    const LANGUAGES = [
        { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
        { code: 'uz_cyrl', label: "Ўзбекча (Кирилл)", flag: '🇺🇿' },
        { code: 'ru', label: "Русский", flag: '🇷🇺' },
    ];

    const setLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        navigation.goBack();
    };

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('language')}
            showBackButton={true}
            containerStyle={{ backgroundColor: isDark ? '#000' : '#F2F2F7' }}
        >
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <View style={[styles.card, isDark && styles.cardDark]}>
                        {LANGUAGES.map((lang, index) => (
                            <View key={lang.code}>
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => setLanguage(lang.code)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.row}>
                                        <Text style={styles.flag}>{lang.flag}</Text>
                                        <Text style={[styles.label, isDark && styles.textWhite]}>
                                            {lang.label}
                                        </Text>
                                    </View>
                                    {i18n.language === lang.code && (
                                        <Ionicons name="checkmark" size={20} color="#007AFF" />
                                    )}
                                </TouchableOpacity>
                                {index < LANGUAGES.length - 1 && (
                                    <View style={[styles.separator, isDark && styles.separatorDark]} />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    section: {
        marginBottom: 24,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    cardDark: {
        backgroundColor: '#1C1C1E',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        fontSize: 24,
        marginRight: 12,
    },
    label: {
        fontSize: 17,
        color: '#000',
    },
    textWhite: {
        color: '#FFF',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#C6C6C8',
        marginLeft: 16, // Inset separator
    },
    separatorDark: {
        backgroundColor: '#38383A',
    },
});

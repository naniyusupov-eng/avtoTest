import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

export const StatisticsScreen = () => {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    return (
        <ScreenLayout
            title={t('statistics', 'Statistika')}
            showBackButton={false}
        >
            <View style={styles.container}>
                <Text style={[styles.text, isDark && styles.textWhite]}>
                    {t('coming_soon', 'Tez orada...')}
                </Text>
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#1C1C1E',
    },
    textWhite: {
        color: '#FFF',
    },
});

export default StatisticsScreen;

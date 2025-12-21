import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

export const HomeScreen = () => {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('home')}
        >
            <View style={styles.centerContainer}>
                {/* Home screen content */}
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;

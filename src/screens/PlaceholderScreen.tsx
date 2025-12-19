import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

interface PlaceholderScreenProps {
    nameKey: string;
    number?: number;
}

export const PlaceholderScreen = ({ nameKey, number }: PlaceholderScreenProps) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    return (
        <ScreenLayout edges={['left', 'right']}>
            <View style={styles.centerContainer}>
                <Text style={[styles.text, isDark && styles.textWhite]}>
                    {t(nameKey)} {number}
                </Text>
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
    text: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    textWhite: {
        color: '#FFF',
    },
});

export default PlaceholderScreen;

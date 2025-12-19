import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

export const TicketDetailScreen = ({ route }: any) => {
    const { ticketNumber } = route.params;
    const { isDark } = useTheme();
    const { t } = useTranslation();

    return (
        <ScreenLayout edges={['left', 'right']}>
            <View style={styles.centerContainer}>
                <Text style={[styles.text, isDark && styles.textWhite]}>
                    {t('tickets')} {ticketNumber}
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

export default TicketDetailScreen;

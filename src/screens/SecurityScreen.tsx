import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export const SecurityScreen = () => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [isAppLockEnabled, setIsAppLockEnabled] = useState(false);
    const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);

    const toggleAppLock = () => {
        Haptics.selectionAsync();
        setIsAppLockEnabled(!isAppLockEnabled);
        if (!isAppLockEnabled) {
            Alert.alert(t('app_lock', 'Kodni o‘rnatish'), t('enter_code', 'Yangi kod kiriting... (Mock)'));
        }
    };

    const toggleBiometrics = () => {
        Haptics.selectionAsync();
        setIsBiometricsEnabled(!isBiometricsEnabled);
    };

    return (
        <ScreenLayout
            title={t('security', 'Xavfsizlik')}
            showBackButton={true}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        >
            <View style={styles.container}>
                <View style={[styles.section, isDark && styles.sectionDark]}>
                    <Text style={[styles.sectionHeader, isDark && styles.textGray]}>{t('app_lock', 'Kodni o‘rnatish')}</Text>

                    {/* App Lock Switch */}
                    <View style={styles.row}>
                        <View style={styles.rowInfo}>
                            <Text style={[styles.rowTitle, isDark && styles.textWhite]}>{t('enable_passcode', 'Kod bilan himoyalash')}</Text>
                            <Text style={styles.rowSubtitle}>{t('passcode_desc', 'Kirish uchun kod so‘rash')}</Text>
                        </View>
                        <Switch
                            value={isAppLockEnabled}
                            onValueChange={toggleAppLock}
                            trackColor={{ false: '#767577', true: '#34C759' }}
                            thumbColor={'#FFF'}
                        />
                    </View>

                    {isAppLockEnabled && (
                        <>
                            <View style={[styles.divider, isDark && { backgroundColor: '#334155' }]} />
                            <TouchableOpacity style={styles.actionRow} onPress={() => Alert.alert('Change Code')}>
                                <Text style={[styles.rowTitle, isDark && styles.textWhite]}>{t('change_passcode', 'Kodni o‘zgartirish')}</Text>
                                <Ionicons name="chevron-forward" size={20} color={isDark ? '#FFF' : '#C7C7CC'} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                <View style={[styles.section, isDark && styles.sectionDark]}>
                    <Text style={[styles.sectionHeader, isDark && styles.textGray]}>{t('biometrics', 'Biometrik')}</Text>
                    <View style={styles.row}>
                        <View style={styles.rowInfo}>
                            <Text style={[styles.rowTitle, isDark && styles.textWhite]}>Face ID / Touch ID</Text>
                            <Text style={styles.rowSubtitle}>{t('biometrics_desc', 'Tezkor kirish')}</Text>
                        </View>
                        <Switch
                            value={isBiometricsEnabled}
                            onValueChange={toggleBiometrics}
                            trackColor={{ false: '#767577', true: '#007AFF' }}
                            thumbColor={'#FFF'}
                        />
                    </View>
                </View>

            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    section: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionDark: {
        backgroundColor: '#1E293B',
    },
    sectionHeader: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B',
        textTransform: 'uppercase',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    textGray: {
        color: '#94A3B8',
    },
    textWhite: {
        color: '#FFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    rowInfo: {
        flex: 1,
        paddingRight: 16,
    },
    rowTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1E293B',
        marginBottom: 2,
    },
    rowSubtitle: {
        fontSize: 13,
        color: '#94A3B8',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 12,
    },
});

export default SecurityScreen;

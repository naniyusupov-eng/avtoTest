import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, ScrollView, Share, Linking } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import TariffsSection from './TariffsSection';
import Slider from '@react-native-community/slider';
import { useFontSize } from '../context/FontSizeContext';
import { FontSizeModal } from '../components/FontSizeModal';

interface SettingItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    description?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    color?: string;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, description, onPress, rightElement, color = '#007AFF' }) => {
    const { isDark } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.item, isDark && styles.itemDark]}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
                <Ionicons name={icon} size={22} color={color} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.label, isDark && styles.textWhite]}>{label}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
            {rightElement}
        </TouchableOpacity>
    );
};

export default function SettingsScreen({ navigation }: any) {
    const { t, i18n } = useTranslation();
    const { isDark, toggleTheme } = useTheme();
    const { fontSize, setFontSize } = useFontSize();
    const [isFontModalVisible, setFontModalVisible] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const setLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: t('share_app_message', 'Check out AvtoTest app!'),
                url: 'https://play.google.com/store/apps/details?id=com.yourapp', // Replace with actual app link
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSupport = () => {
        Linking.openURL('https://t.me/your_support_bot'); // Replace with actual Telegram link
    };

    return (
        <ScreenLayout edges={['left', 'right']} style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[styles.scrollView, isDark && styles.scrollViewDark]}
            >
                <TariffsSection navigation={navigation} />
                <View style={[styles.section, { marginTop: 16 }]}>
                    <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('app_settings')}</Text>
                    <View style={[styles.card, isDark && styles.cardDark]}>

                        <SettingItem
                            icon="language"
                            label={t('language')}
                            color="#007AFF"
                            rightElement={
                                <View style={[styles.langToggleContainer, isDark && styles.langToggleContainerDark]}>
                                    <TouchableOpacity
                                        onPress={() => setLanguage('uz')}
                                        style={[
                                            styles.langOption,
                                            i18n.language === 'uz' && styles.langOptionActive
                                        ]}
                                    >
                                        <Text style={[
                                            styles.langOptionText,
                                            i18n.language === 'uz' && styles.langOptionTextActive
                                        ]}>UZ</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setLanguage('uz_cyrl')}
                                        style={[
                                            styles.langOption,
                                            i18n.language === 'uz_cyrl' && styles.langOptionActive
                                        ]}
                                    >
                                        <Text style={[
                                            styles.langOptionText,
                                            i18n.language === 'uz_cyrl' && styles.langOptionTextActive
                                        ]}>ЎЗ</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setLanguage('ru')}
                                        style={[
                                            styles.langOption,
                                            i18n.language === 'ru' && styles.langOptionActive
                                        ]}
                                    >
                                        <Text style={[
                                            styles.langOptionText,
                                            i18n.language === 'ru' && styles.langOptionTextActive
                                        ]}>RU</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                        <View style={[styles.separator, isDark && styles.separatorDark]} />
                        <SettingItem
                            icon="notifications"
                            label={t('notifications')}
                            color="#FF9500"
                            rightElement={
                                <Switch
                                    value={notifications}
                                    onValueChange={setNotifications}
                                    trackColor={{ false: '#767577', true: '#34C759' }}
                                    thumbColor="#f4f3f4"
                                />
                            }
                        />
                        <View style={[styles.separator, isDark && styles.separatorDark]} />

                        <SettingItem
                            icon="moon"
                            label={t('dark_mode')}
                            color="#5856D6"
                            rightElement={
                                <Switch
                                    value={isDark}
                                    onValueChange={toggleTheme}
                                    trackColor={{ false: '#767577', true: '#34C759' }}
                                    thumbColor="#f4f3f4"
                                />
                            }
                        />
                        <View style={[styles.separator, isDark && styles.separatorDark]} />
                        <SettingItem
                            icon="text"
                            label={t('font_size')}
                            color="#007AFF"
                            onPress={() => setFontModalVisible(true)}
                            rightElement={
                                <Text style={{ color: '#8E8E93', fontSize: 16 }}>{fontSize}px</Text>
                            }
                        />
                    </View>
                </View>

                <FontSizeModal visible={isFontModalVisible} onClose={() => setFontModalVisible(false)} />

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('support')}</Text>
                    <View style={[styles.card, isDark && styles.cardDark]}>
                        <SettingItem
                            icon="help-circle"
                            label={t('help_support')}
                            color="#34C759"
                            onPress={handleSupport}
                        />
                        <View style={[styles.separator, isDark && styles.separatorDark]} />
                        <SettingItem
                            icon="star"
                            label={t('rate_us')}
                            color="#FFCC00"
                        />
                        <View style={[styles.separator, isDark && styles.separatorDark]} />
                        <SettingItem
                            icon="share-social"
                            label={t('share_app')}
                            color="#007AFF"
                            onPress={handleShare}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('about')}</Text>
                    <View style={[styles.card, isDark && styles.cardDark]}>
                        <SettingItem
                            icon="information-circle"
                            label={t('version')}
                            description="1.0.0"
                            color="#8E8E93"
                        />
                    </View>
                </View>
            </ScrollView>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
    },
    scrollView: {
        backgroundColor: '#FFF',
    },
    scrollViewDark: {
        backgroundColor: '#1a1a1a',
    },
    section: {
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '400',
        color: '#6E6E73',
        marginBottom: 8,
        marginLeft: 16,
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: '#FFF',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#C6C6C8',
    },
    cardDark: {
        backgroundColor: '#2C2C2E',
        borderColor: '#3A3A3C',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        minHeight: 44,
    },
    itemDark: {
        // backgroundColor: '#1C1C1E',
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 17,
        color: '#000',
    },
    description: {
        fontSize: 14,
        color: '#8E8E93',
        marginTop: 2,
    },
    textWhite: {
        color: '#FFF',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#C6C6C8',
        marginLeft: 58,
    },
    separatorDark: {
        backgroundColor: '#3A3A3C',
    },
    langToggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#E9E9EB',
        borderRadius: 8,
        padding: 2,
    },
    langToggleContainerDark: {
        backgroundColor: '#3A3A3C',
    },
    langOption: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
    langOptionActive: {
        backgroundColor: '#007AFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    langOptionText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#8E8E93',
    },
    langOptionTextActive: {
        color: '#FFF',
    }
});
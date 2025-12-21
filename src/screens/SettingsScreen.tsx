import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, ScrollView, Share, Linking } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import TariffsSection from './TariffsSection';
import { useFontSize } from '../context/FontSizeContext';
import { FontSizeModal } from '../components/FontSizeModal';

interface SettingItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    description?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    color?: string; // Icon Background Color
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, description, onPress, rightElement, color = '#007AFF' }) => {
    const { isDark } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.item, isDark && styles.itemDark]}
            onPress={onPress}
            disabled={!onPress}
            activeOpacity={0.6}
        >
            <View style={[styles.iconContainer, { backgroundColor: color }]}>
                <Ionicons name={icon} size={18} color="#FFF" />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.label, isDark && styles.textWhite]}>{label}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
            {rightElement ? rightElement : (
                <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
            )}
        </TouchableOpacity>
    );
};

export default function SettingsScreen({ navigation }: any) {
    const { t, i18n } = useTranslation();
    const { isDark, toggleTheme } = useTheme();
    const { fontSize } = useFontSize();
    const [isFontModalVisible, setFontModalVisible] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const setLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: t('share_app_message', 'Check out AvtoTest app!'),
                url: 'https://play.google.com/store/apps/details?id=com.yourapp',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSupport = () => {
        Linking.openURL('https://t.me/your_support_bot');
    };

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('settings')}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[styles.scrollView, isDark && styles.scrollViewDark]}
                contentContainerStyle={{ paddingBottom: 100, paddingTop: 16 }}
            >
                {/* Tariffs usually distinct */}
                <View style={{ marginBottom: 24 }}>
                    <TariffsSection navigation={navigation} />
                </View>

                <View style={styles.section}>
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
                            color="#00C7BE"
                            onPress={() => setFontModalVisible(true)}
                            rightElement={
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#8E8E93', fontSize: 17, marginRight: 6 }}>{fontSize}px</Text>
                                    <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
                                </View>
                            }
                        />
                    </View>
                </View>

                <FontSizeModal visible={isFontModalVisible} onClose={() => setFontModalVisible(false)} />

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('support')}</Text>
                    <View style={[styles.card, isDark && styles.cardDark]}>
                        <SettingItem
                            icon="help-buoy"
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
                            icon="information"
                            label={t('version')}
                            description="1.0.0"
                            color="#8E8E93"
                            rightElement={<Text style={{ color: '#8E8E93', fontSize: 17 }}>1.0.0</Text>}
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
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
    scrollViewDark: {
        backgroundColor: 'transparent',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6E6E73',
        marginBottom: 8,
        marginLeft: 32, // Indent for inset
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    cardDark: {
        backgroundColor: '#2C2C2E',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 11,
        paddingHorizontal: 16,
        minHeight: 46,
        backgroundColor: 'transparent',
    },
    itemDark: {
    },
    iconContainer: {
        width: 28,
        height: 28,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: 17,
        color: '#000',
        fontWeight: '400',
    },
    description: {
        fontSize: 13,
        color: '#8E8E93',
        marginTop: 2,
    },
    textWhite: {
        color: '#FFF',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#C6C6C8',
        marginLeft: 58, // 16 (pad) + 28 (icon) + 14 (margin) = 58
    },
    separatorDark: {
        backgroundColor: '#38383A',
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
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    langOptionActive: {
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    langOptionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#8E8E93',
    },
    langOptionTextActive: {
        color: '#000',
    }
});
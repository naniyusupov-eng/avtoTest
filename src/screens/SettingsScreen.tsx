import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Switch, ScrollView, Share, Linking, Modal, Pressable } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import TariffsSection from './TariffsSection';
import { useFontSize } from '../context/FontSizeContext';
import Slider from '@react-native-community/slider';

interface SettingItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    description?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
    color?: string; // Icon Background Color
    style?: any;
}

const SettingItem: React.FC<SettingItemProps> = ({ icon, label, description, onPress, rightElement, color = '#243B55', style }) => {
    const { isDark } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.item, isDark && styles.itemDark, style]}
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
    const { fontSize, setFontSize } = useFontSize();
    const [isFontModalVisible, setFontModalVisible] = useState(false);

    const [isLangModalVisible, setLangModalVisible] = useState(false);

    const [notifications, setNotifications] = useState(true);
    const [filterText, setFilterText] = useState('');

    const LANGUAGES = [
        { code: 'uz', label: "O'zbekcha", flag: '🇺🇿' },
        { code: 'uz_cyrl', label: "Ўзбекча (Кирилл)", flag: '🇺🇿' },
        { code: 'ru', label: "Русский", flag: '🇷🇺' },
    ];

    const currentLangLabel = LANGUAGES.find(l => l.code === i18n.language)?.label || "O'zbekcha";

    const setLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setLangModalVisible(false);
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

    // Helper for visibility
    const isVisible = (text: string) => text.toLowerCase().includes(filterText.toLowerCase());

    const showLanguage = isVisible(t('language'));
    const showNotifications = isVisible(t('notifications'));
    const showDarkMode = isVisible(t('dark_mode'));
    const showFontSize = isVisible(t('font_size'));
    const showAppSettings = showLanguage || showNotifications || showDarkMode || showFontSize;

    const showHelp = isVisible(t('help_support'));
    const showRate = isVisible(t('rate_us'));
    const showShare = isVisible(t('share_app'));
    const showSupportSection = showHelp || showRate || showShare;

    const showVersion = isVisible(t('version')) || isVisible(t('about'));
    const showAboutSection = showVersion;

    const showTariffs = isVisible(t('tariflar')) || isVisible('Premium');

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('settings')}
            onSearch={setFilterText}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[styles.scrollView, isDark && styles.scrollViewDark]}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Tariffs */}
                {showTariffs && (
                    <View style={{ marginBottom: 24 }}>
                        <TariffsSection navigation={navigation} />
                    </View>
                )}

                {showAppSettings && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('app_settings')}</Text>
                        <View style={[styles.card, isDark && styles.cardDark]}>

                            {showLanguage && (
                                <>
                                    <SettingItem
                                        icon="language"
                                        label={t('language')}
                                        color="#243B55" // Dark Blue
                                        onPress={() => setLangModalVisible(true)}
                                        rightElement={
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: '#8E8E93', fontSize: 17, marginRight: 6 }}>{currentLangLabel}</Text>
                                                <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
                                            </View>
                                        }
                                    />
                                    {(showNotifications || showDarkMode || showFontSize) && <View style={[styles.separator, isDark && styles.separatorDark]} />}
                                </>
                            )}

                            {showNotifications && (
                                <>
                                    <SettingItem
                                        icon="notifications"
                                        label={t('notifications')}
                                        color="#FF9500" // Keep Semantic Color
                                        rightElement={
                                            <Switch
                                                value={notifications}
                                                onValueChange={setNotifications}
                                                trackColor={{ false: '#767577', true: '#34C759' }}
                                                thumbColor="#f4f3f4"
                                            />
                                        }
                                    />
                                    {(showDarkMode || showFontSize) && <View style={[styles.separator, isDark && styles.separatorDark]} />}
                                </>
                            )}

                            {showDarkMode && (
                                <>
                                    <SettingItem
                                        icon="moon"
                                        label={t('dark_mode')}
                                        color="#5856D6" // Keep Semantic Color
                                        rightElement={
                                            <Switch
                                                value={isDark}
                                                onValueChange={toggleTheme}
                                                trackColor={{ false: '#767577', true: '#34C759' }}
                                                thumbColor="#f4f3f4"
                                            />
                                        }
                                    />
                                    {showFontSize && <View style={[styles.separator, isDark && styles.separatorDark]} />}
                                </>
                            )}

                            {showFontSize && (
                                <SettingItem
                                    icon="text"
                                    label={t('font_size')}
                                    color="#141E30" // Dark Blue-ish Black
                                    onPress={() => setFontModalVisible(true)}
                                    rightElement={
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: '#8E8E93', fontSize: 17, marginRight: 6 }}>{fontSize}px</Text>
                                            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
                                        </View>
                                    }
                                />
                            )}
                        </View>
                    </View>
                )}

                {/* Centered Modal: Language */}
                <Modal
                    visible={isLangModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setLangModalVisible(false)}
                >
                    <Pressable style={styles.modalOverlay} onPress={() => setLangModalVisible(false)}>
                        <Pressable style={[styles.modalContent, isDark && styles.modalContentDark]}>
                            <Text style={[styles.modalTitle, isDark && styles.textWhite]}>{t('select_language')}</Text>

                            {LANGUAGES.map((lang, index) => (
                                <View key={lang.code}>
                                    <TouchableOpacity
                                        style={styles.langItem}
                                        onPress={() => setLanguage(lang.code)}
                                    >
                                        <Text style={styles.langFlag}>{lang.flag}</Text>
                                        <Text style={[
                                            styles.langLabel,
                                            isDark && styles.textWhite,
                                            i18n.language === lang.code && styles.langLabelActive
                                        ]}>
                                            {lang.label}
                                        </Text>
                                        {i18n.language === lang.code && (
                                            <Ionicons name="checkmark" size={24} color="#243B55" />
                                        )}
                                    </TouchableOpacity>
                                    {index < LANGUAGES.length - 1 && (
                                        <View style={[styles.modalSeparator, isDark && styles.modalSeparatorDark]} />
                                    )}
                                </View>
                            ))}

                            <TouchableOpacity style={styles.closeButton} onPress={() => setLangModalVisible(false)}>
                                <Text style={styles.closeButtonText}>{t('cancel')}</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </Pressable>
                </Modal>

                {/* Centered Modal: Font Size */}
                <Modal
                    visible={isFontModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setFontModalVisible(false)}
                >
                    <Pressable style={styles.modalOverlay} onPress={() => setFontModalVisible(false)}>
                        <Pressable style={[styles.modalContent, isDark && styles.modalContentDark]}>
                            <Text style={[styles.modalTitle, isDark && styles.textWhite]}>{t('font_size')}</Text>

                            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: isDark ? '#FFF' : '#000' }}>
                                {fontSize} px
                            </Text>

                            <View style={styles.sliderContainer}>
                                <View style={styles.iconRow}>
                                    <Ionicons name="text" size={16} color={isDark ? "#FFF" : "#000"} />
                                    <Ionicons name="text" size={28} color={isDark ? "#FFF" : "#000"} />
                                </View>
                                <Slider
                                    style={{ width: '100%', height: 40 }}
                                    minimumValue={12}
                                    maximumValue={30}
                                    step={1}
                                    value={fontSize}
                                    onValueChange={setFontSize}
                                    minimumTrackTintColor="#243B55"
                                    maximumTrackTintColor={isDark ? "#555" : "#CCC"}
                                    thumbTintColor="#243B55"
                                />
                            </View>

                            <TouchableOpacity style={styles.closeButton} onPress={() => setFontModalVisible(false)}>
                                <Text style={styles.closeButtonText}>{t('cancel')}</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </Pressable>
                </Modal>

                {showSupportSection && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('support')}</Text>
                        <View style={[styles.card, isDark && styles.cardDark]}>
                            {showHelp && (
                                <>
                                    <SettingItem
                                        icon="help-buoy"
                                        label={t('help_support')}
                                        color="#34C759"
                                        onPress={handleSupport}
                                    />
                                    {(showRate || showShare) && <View style={[styles.separator, isDark && styles.separatorDark]} />}
                                </>
                            )}
                            {showRate && (
                                <>
                                    <SettingItem
                                        icon="star"
                                        label={t('rate_us')}
                                        color="#FFCC00"
                                    />
                                    {showShare && <View style={[styles.separator, isDark && styles.separatorDark]} />}
                                </>
                            )}
                            {showShare && (
                                <SettingItem
                                    icon="share-social"
                                    label={t('share_app')}
                                    color="#243B55" // Dark Blue
                                    onPress={handleShare}
                                />
                            )}
                        </View>
                    </View>
                )}

                {showAboutSection && (
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
                )}

                {(!showAppSettings && !showSupportSection && !showAboutSection && !showTariffs) && (
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Text style={{ color: '#8E8E93', fontSize: 16 }}>{t('nothing_found', 'Hech narsa topilmadi')}</Text>
                    </View>
                )}
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
        marginLeft: 32,
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginHorizontal: 16,
        overflow: 'hidden',
        // Shadow for premium feel
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#1E293B',
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
        marginLeft: 58,
    },
    separatorDark: {
        backgroundColor: '#38383A',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        maxWidth: 340,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    modalContentDark: {
        backgroundColor: '#1C1C1E',
        shadowColor: '#000',
        shadowOpacity: 0.5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    langItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },
    langFlag: {
        fontSize: 24,
        marginRight: 16,
    },
    langLabel: {
        fontSize: 17,
        color: '#000',
        flex: 1,
    },
    langLabelActive: {
        color: '#243B55',
        fontWeight: '600',
    },
    modalSeparator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#E5E5EA',
    },
    modalSeparatorDark: {
        backgroundColor: '#38383A',
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#F2F2F7',
        borderRadius: 12,
    },
    closeButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
    },
    sliderContainer: {
        width: '100%',
        marginBottom: 10,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 8,
    },
});
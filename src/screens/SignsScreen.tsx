import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';

const SIGN_CATEGORIES = [
    { id: 'warning', titleKey: 'warning_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Vienna_Convention_road_sign_Aa.svg/500px-Vienna_Convention_road_sign_Aa.svg.png', color: '#FF9500' },
    { id: 'priority', titleKey: 'priority_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Vienna_Convention_road_sign_B2a.svg/500px-Vienna_Convention_road_sign_B2a.svg.png', color: '#FF3B30' },
    { id: 'prohibiting', titleKey: 'prohibiting_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Vienna_Convention_road_sign_C3a.svg/500px-Vienna_Convention_road_sign_C3a.svg.png', color: '#FF3B30' },
    { id: 'mandatory', titleKey: 'mandatory_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Vienna_Convention_road_sign_D1a.svg/500px-Vienna_Convention_road_sign_D1a.svg.png', color: '#007AFF' },
    { id: 'information', titleKey: 'information_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Vienna_Convention_road_sign_E5a.svg/500px-Vienna_Convention_road_sign_E5a.svg.png', color: '#007AFF' },
    { id: 'service', titleKey: 'service_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Vienna_Convention_road_sign_F1a.svg/500px-Vienna_Convention_road_sign_F1a.svg.png', color: '#34C759' },
    { id: 'additional', titleKey: 'additional_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Vienna_Convention_road_sign_H3a.svg/500px-Vienna_Convention_road_sign_H3a.svg.png', color: '#8E8E93' },
    { id: 'temporary', titleKey: 'temporary_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Zeichen_123_-_Baustelle%2C_StVO_1992.svg/500px-Zeichen_123_-_Baustelle%2C_StVO_1992.svg.png', color: '#FFCC00' },
    { id: 'traffic_lights', titleKey: 'traffic_lights_signals', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Traffic_light_red_amber_green.svg/500px-Traffic_light_red_amber_green.svg.png', color: '#34C759' },
    { id: 'vehicle', titleKey: 'vehicle_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Vienna_Convention_road_sign_G1a.svg/500px-Vienna_Convention_road_sign_G1a.svg.png', color: '#5856D6' },
    { id: 'danger', titleKey: 'danger_signs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Vienna_Convention_road_sign_Aa.svg/500px-Vienna_Convention_road_sign_Aa.svg.png', color: '#FF9500' },
];

const MARKING_CATEGORIES = [
    { id: 'horizontal_markings', titleKey: 'horizontal_markings', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Road_markings_zebra_crossing.jpg/640px-Road_markings_zebra_crossing.jpg', color: '#000000' },
    { id: 'vertical_markings', titleKey: 'vertical_markings', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Singapore_Road_Signs_-_Obstacles_-_Split_Arrow_%28Type_2%29.svg/500px-Singapore_Road_Signs_-_Obstacles_-_Split_Arrow_%28Type_2%29.svg.png', color: '#5856D6' },
];

const SignCategoryRow = ({ item, index, navigation, t, isDark }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            delay: index * 20,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity
                style={[styles.msgRow, isDark && styles.msgRowDark]}
                activeOpacity={0.6}
                onPress={() => {
                    Haptics.selectionAsync();
                    navigation.navigate('SignsList', { categoryId: item.id, title: t(item.titleKey) });
                }}
            >
                {/* Avatar with Custom Color */}
                <View style={[styles.avatar, { backgroundColor: isDark ? '#1E293B' : '#E5E5EA' }]}>
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Content */}
                <View style={[styles.msgContent, isDark && styles.msgContentBorderDark]}>
                    <View style={styles.msgHeader}>
                        <Text style={[styles.senderName, isDark && styles.textWhite]} numberOfLines={1}>
                            {t(item.titleKey)}
                        </Text>
                        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" style={{ marginLeft: 8 }} />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export const SignsScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [filterText, setFilterText] = useState('');

    const filterCategories = (categories: typeof SIGN_CATEGORIES) => {
        return categories.filter(c => t(c.titleKey).toLowerCase().includes(filterText.toLowerCase()));
    };

    const filteredSignCategories = filterCategories(SIGN_CATEGORIES);
    const filteredMarkingCategories = filterCategories(MARKING_CATEGORIES);

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={t('signs')}
            showBackButton={true} // Enable Back Button
            backLabel={t('home')}
            onSearch={setFilterText}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#FFF' }} // SMS Style BG (Rule: 0F172A? User asked for SMS style here. I will use Slate from Rule Screen to match EXACTLY "shu ishlarni qil" (do the same checks))
        // Wait, "shu ishlarni qil" -> "Do the same things". 
        // In RulesScreen I ended up with Slate (#0F172A) because "broken".
        // So I will use Slate here too.
        >
            <ScrollView
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: isDark ? '#0F172A' : '#FFF' }}
            >
                {filteredSignCategories.length > 0 && (
                    <>
                        <Text style={[styles.sectionHeader, isDark && styles.textWhite]}>{t('road_signs')}</Text>
                        {filteredSignCategories.map((item, index) => (
                            <SignCategoryRow key={item.id} item={item} index={index} navigation={navigation} t={t} isDark={isDark} />
                        ))}
                    </>
                )}

                {filteredMarkingCategories.length > 0 && (
                    <>
                        <View style={{ height: 20 }} />
                        <Text style={[styles.sectionHeader, isDark && styles.textWhite]}>{t('road_markings')}</Text>
                        {filteredMarkingCategories.map((item, index) => (
                            <SignCategoryRow key={item.id} item={item} index={index + filteredSignCategories.length} navigation={navigation} t={t} isDark={isDark} />
                        ))}
                    </>
                )}

                {filteredSignCategories.length === 0 && filteredMarkingCategories.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, isDark && styles.textWhite]}>
                            {t('nothing_found', 'Hech narsa topilmadi')}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    listContent: {
        paddingVertical: 10,
        paddingBottom: 120,
    },
    sectionHeader: {
        fontSize: 22, // Large bold header like "Messages"
        fontWeight: '700',
        paddingHorizontal: 16,
        marginBottom: 10,
        color: '#000',
        marginTop: 10,
    },
    msgRow: {
        flexDirection: 'row',
        paddingLeft: 16,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    msgRowDark: {
        backgroundColor: 'transparent',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        backgroundColor: '#E5E5EA',
    },
    msgContent: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#C6C6C8',
        paddingVertical: 20,
        paddingRight: 16,
    },
    msgContentBorderDark: {
        borderBottomColor: '#334155',
    },
    msgHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    senderName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        flex: 1,
    },
    textWhite: {
        color: '#E2E8F0',
    },
    emptyContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#8E8E93',
    },
});

export default SignsScreen;

import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Animated, Image, Dimensions } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
// 3 columns: (Total Width - Padding) / 3
// We'll use % based width for simplicity in styles or flex wrap

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

const SignCategoryGridItem = ({ item, index, navigation, t, isDark }: any) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            delay: index * 30,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={{ opacity: fadeAnim, width: '31%', margin: '1%', marginBottom: 12 }}>
            <TouchableOpacity
                style={[styles.gridCard, isDark && styles.gridCardDark]}
                onPress={() => {
                    Haptics.selectionAsync();
                    navigation.navigate('SignsList', { categoryId: item.id, title: t(item.titleKey) });
                }}
            >
                <View style={[styles.gridIconContainer, { backgroundColor: isDark ? '#334155' : '#F1F5F9' }]}>
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={{ width: 44, height: 44 }}
                        resizeMode="contain"
                    />
                </View>

                <Text style={[styles.gridLabel, isDark && styles.textWhite]} numberOfLines={2}>
                    {t(item.titleKey)}
                </Text>
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
            showBackButton={true}
            backLabel={t('home')}
            onSearch={setFilterText}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        >
            <ScrollView
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
            >
                {filteredSignCategories.length > 0 && (
                    <>
                        <Text style={[styles.sectionHeader, isDark && styles.textWhite]}>{t('road_signs')}</Text>
                        <View style={styles.gridContainer}>
                            {filteredSignCategories.map((item, index) => (
                                <SignCategoryGridItem key={item.id} item={item} index={index} navigation={navigation} t={t} isDark={isDark} />
                            ))}
                        </View>
                    </>
                )}

                {filteredMarkingCategories.length > 0 && (
                    <>
                        <View style={{ height: 20 }} />
                        <Text style={[styles.sectionHeader, isDark && styles.textWhite]}>{t('road_markings')}</Text>
                        <View style={styles.gridContainer}>
                            {filteredMarkingCategories.map((item, index) => (
                                <SignCategoryGridItem key={item.id} item={item} index={index + filteredSignCategories.length} navigation={navigation} t={t} isDark={isDark} />
                            ))}
                        </View>
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
        paddingVertical: 16,
        paddingBottom: 120,
        paddingHorizontal: 8,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: '700',
        paddingHorizontal: 8,
        marginBottom: 12,
        color: '#1E293B',
        marginTop: 8,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    gridCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 140,
        width: '100%',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    gridCardDark: {
        backgroundColor: '#1E293B',
        shadowColor: '#000',
        shadowOpacity: 0.2,
    },
    gridIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    gridLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#334155',
        textAlign: 'center',
        lineHeight: 16,
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

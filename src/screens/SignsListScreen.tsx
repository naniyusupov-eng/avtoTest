import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { SIGNS_DATA } from '../data/signs_content';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_WIDTH = (width - 48) / COLUMN_COUNT;

export const SignsListScreen = ({ route }: any) => {
    const { categoryId, title } = route.params;
    const { t } = useTranslation();
    const { isDark } = useTheme();

    const [filterText, setFilterText] = useState('');

    const signs = SIGNS_DATA.filter(sign => sign.category === categoryId);

    const filteredSigns = signs.filter(item => {
        const name = (t(item.name_key) || item.name_uz || '').toLowerCase();
        const code = (item.code || '').toLowerCase();
        const search = filterText.toLowerCase();
        return name.includes(search) || code.includes(search);
    });

    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={[styles.itemContainer, isDark && styles.itemContainerDark]}>
            <View style={[styles.imageContainer, isDark && styles.imageContainerDark]}>
                <Image
                    source={{ uri: item.image_url }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <Text style={[styles.code, isDark && styles.textGray]}>{item.code}</Text>
            <Text
                style={[styles.name, isDark && styles.textWhite]}
                numberOfLines={3}
            >
                {t(item.name_key) || item.name_uz}
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScreenLayout
            edges={['top', 'left', 'right']}
            title={title}
            showBackButton={true}
            onSearch={setFilterText}
        >
            <View style={styles.container}>
                {signs.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, isDark && styles.textWhite]}>
                            {t('coming_soon') || 'Tez orada...'}
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredSigns}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContent}
                        numColumns={COLUMN_COUNT}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={[styles.emptyText, isDark && styles.textWhite, { marginTop: 40 }]}>
                                    {t('nothing_found', 'Hech narsa topilmadi')}
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 16,
    },
    itemContainer: {
        width: ITEM_WIDTH,
        marginRight: 8,
        marginBottom: 16,
        alignItems: 'center',
    },
    itemContainerDark: {
        // Optional
    },
    imageContainer: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#F2F2F7',
        borderRadius: 8,
        padding: 4,
    },
    imageContainerDark: {
        backgroundColor: '#2C2C2E',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    code: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#666',
    },
    name: {
        fontSize: 11,
        textAlign: 'center',
        color: '#000',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#8E8E93',
        textAlign: 'center',
    },
    textWhite: {
        color: '#FFF',
    },
    textGray: {
        color: '#AAA',
    },
});

export default SignsListScreen;

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { SIGNS_DATA } from '../data/signs_content';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2; // Switched to 2 columns for better visibility
const GAP = 12; // Gap between items
const PADDING = 16;
// Calculate item width accounting for padding and gap
const ITEM_WIDTH = (width - (PADDING * 2) - (GAP * (COLUMN_COUNT - 1))) / COLUMN_COUNT;

export const SignsListScreen = ({ route }: any) => {
    const { categoryId, title } = route.params;
    const { t } = useTranslation();
    const { isDark } = useTheme();

    const [filterText, setFilterText] = useState('');

    const signs = SIGNS_DATA.filter(sign => sign.category === categoryId);

    const filteredSigns = signs.filter(item => {
        const name = (t(item.name_key || '') || item.name_uz || '').toLowerCase();
        const code = (item.code || '').toLowerCase();
        const search = filterText.toLowerCase();
        return name.includes(search) || code.includes(search);
    });

    const renderItem = ({ item, index }: any) => {
        // Adjust gap logic if needed, or use columnWrapperStyle GAP

        return (
            <TouchableOpacity
                style={[
                    styles.itemCard,
                    isDark && styles.itemCardDark,
                    { width: ITEM_WIDTH } // Explicit width
                ]}
                activeOpacity={0.8}
            >
                <View style={styles.headerRow}>
                    <View style={[styles.codeBadge, isDark && styles.codeBadgeDark]}>
                        <Text style={[styles.codeText, isDark && styles.codeTextDark]}>{item.code}</Text>
                    </View>
                </View>

                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: item.image_url }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.infoContainer}>
                    <Text
                        style={[styles.nameText, isDark && styles.textWhite]}
                        numberOfLines={3}
                    >
                        {t(item.name_key || '') || item.name_uz}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

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
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
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
        padding: PADDING,
        paddingBottom: 40,
        gap: GAP, // RN 0.71+ supports gap in List? columnWrapperStyle handles horizontal. Vertical gap needs explicit style or ItemSeparatorComponent.
        // Actually FlatList 'gap' prop isn't fully standard yet on all versions, better use marginBottom on item.
    },
    itemCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 12,
        marginBottom: GAP,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
        alignItems: 'center',
    },
    itemCardDark: {
        backgroundColor: '#2C2C2E',
        borderColor: '#3A3A3C',
        shadowOpacity: 0.2,
    },
    headerRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 8,
    },
    codeBadge: {
        backgroundColor: '#F2F2F7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    codeBadgeDark: {
        backgroundColor: '#3A3A3C',
    },
    codeText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#8E8E93',
    },
    codeTextDark: {
        color: '#AEAEB2',
    },
    imageWrapper: {
        width: '100%',
        aspectRatio: 1.1, // Slightly taller than wide or square
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    image: {
        width: '90%',
        height: '90%',
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    nameText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: '#1C1C1E',
        lineHeight: 18,
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
});

export default SignsListScreen;

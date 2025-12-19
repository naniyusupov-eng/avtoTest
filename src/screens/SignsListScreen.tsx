import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

export const SignsListScreen = ({ route }: any) => {
    const { categoryId, title } = route.params;
    const { t } = useTranslation();
    const { isDark } = useTheme();

    // Placeholder data for now
    const signs: any[] = [];

    return (
        <ScreenLayout edges={['left', 'right']}>
            <View style={styles.container}>
                {signs.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, isDark && styles.textWhite]}>
                            {t('coming_soon') || 'Tez orada...'}
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={signs}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.signItem}>
                                <Text>{item.name}</Text>
                            </View>
                        )}
                        contentContainerStyle={styles.listContent}
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
    signItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    textWhite: {
        color: '#FFF',
    },
});

export default SignsListScreen;

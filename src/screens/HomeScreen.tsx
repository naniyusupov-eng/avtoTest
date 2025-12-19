import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';

export const HomeScreen = () => {
    return (
        <ScreenLayout edges={['left', 'right']}>
            <View style={styles.centerContainer}>
                {/* Home screen cleared as requested */}
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
});

export default HomeScreen;

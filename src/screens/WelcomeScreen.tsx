import React, { useEffect } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

export default function WelcomeScreen({ navigation }: any) {
    const { isDark } = useTheme();
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        // Auto-navigate after 2 seconds
        const timer = setTimeout(() => {
            navigation.replace('Main');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <StatusBar style={isDark ? "light" : "dark"} />

            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Image
                    source={isDark ? require('../../assets/PravaGPTWhite.png') : require('../../assets/PravaGPTLogo.png')}
                    style={styles.logo}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerDark: {
        backgroundColor: '#1E293B',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 40
    },
    logo: {
        width: '90%',
        height: 140,
        resizeMode: 'contain'
    }
});

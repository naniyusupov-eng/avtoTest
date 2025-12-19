import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Text } from '../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

export default function WelcomeScreen({ navigation }: any) {
    const { isDark } = useTheme();
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        // Auto-navigate after 1 second
        const timer = setTimeout(() => {
            navigation.replace('Main');
        }, 1500); // 1.5s to account for entry animation

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={[styles.container, isDark && styles.containerDark]}>
            <StatusBar style={isDark ? "light" : "dark"} />

            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <Ionicons name="car-sport" size={100} color="#007AFF" />
                <Text style={[styles.logoText, isDark && styles.textDark]}>AvtoTest</Text>
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
        backgroundColor: '#1a1a1a',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#000',
    },
    textDark: {
        color: '#fff',
    },
});

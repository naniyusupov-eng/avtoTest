import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';

interface TariffsSectionProps {
    navigation: any;
}

const TariffsSection: React.FC<TariffsSectionProps> = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.container}
            onPress={() => navigation.navigate('Tariflar')}
        >
            <LinearGradient
                colors={['#007AFF', '#5856D6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="diamond" size={32} color="#FFD700" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{t('tariflar')}</Text>

                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#FFF" />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 16,
        borderRadius: 16,
        shadowColor: "#007AFF",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    gradient: {
        borderRadius: 16,
        padding: 20,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
    },
});

export default TariffsSection;
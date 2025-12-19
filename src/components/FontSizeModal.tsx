import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import Modal from 'react-native-modal';
import { useFontSize } from '../context/FontSizeContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

interface FontSizeModalProps {
    visible: boolean;
    onClose: () => void;
}

export const FontSizeModal: React.FC<FontSizeModalProps> = ({ visible, onClose }) => {
    const { fontSize, setFontSize } = useFontSize();
    const { isDark } = useTheme();
    const { t } = useTranslation();

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={onClose}
            onSwipeComplete={onClose}
            swipeDirection="down"
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={400}
            animationOutTiming={400}
            backdropOpacity={0}
            useNativeDriver={true}
        >
            <View style={[styles.modalContent, isDark && styles.modalContentDark]}>
                <View style={styles.handleContainer}>
                    <View style={styles.handle} />
                </View>

                <View style={styles.header}>
                    <Text style={[styles.title, isDark && styles.textWhite]}>{t('font_size')}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close-circle" size={28} color={isDark ? "#555" : "#CCC"} />
                    </TouchableOpacity>
                </View>

                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: isDark ? '#FFF' : '#000' }}>
                    {fontSize} px
                </Text>

                <View style={styles.sliderContainer}>
                    <View style={styles.iconRow}>
                        <Ionicons name="text" size={16} color={isDark ? "#FFF" : "#000"} />
                        <Ionicons name="text" size={32} color={isDark ? "#FFF" : "#000"} />
                    </View>
                    <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={12}
                        maximumValue={30}
                        step={1}
                        value={fontSize}
                        onValueChange={setFontSize}
                        minimumTrackTintColor="#007AFF"
                        maximumTrackTintColor={isDark ? "#555" : "#CCC"}
                        thumbTintColor="#007AFF"
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
        minHeight: 250,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 10,
    },
    modalContentDark: {
        backgroundColor: '#1C1C1E',
    },
    handleContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    handle: {
        width: 40,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 2.5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    textWhite: {
        color: '#FFF',
    },
    sliderContainer: {
        width: '100%',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        paddingHorizontal: 8,
    },
});

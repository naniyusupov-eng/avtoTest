import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Switch, Alert } from 'react-native';
import { Text } from '../components/ThemedText';
import { ScreenLayout } from '../components/ScreenLayout';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';

export const ProfileScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const { isDark } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [avatarUri, setAvatarUri] = useState<string | null>(null);

    // Mock User Data
    const [userData, setUserData] = useState({
        name: 'Foydalanuvchi',
        phone: '+998 90 123 45 67',
        region: 'Toshkent shahri',
        bio: 'Yangi haydovchi',
    });

    const handleSave = () => {
        setIsEditing(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert(t('success', 'Muvaffaqiyatli'), t('saved', 'Ma\'lumotlar saqlandi'));
    };

    const toggleEdit = () => {
        Haptics.selectionAsync();
        if (isEditing) {
            handleSave();
        } else {
            setIsEditing(true);
        }
    };

    const pickImage = async () => {
        if (!isEditing) return;
        Haptics.selectionAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setAvatarUri(result.assets[0].uri);
        }
    };

    const renderField = (label: string, key: keyof typeof userData, icon: any, placeholder: string) => (
        <View style={[styles.fieldContainer, isDark && styles.fieldContainerDark]}>
            <View style={[styles.iconBox, { backgroundColor: isDark ? '#334155' : '#F1F5F9' }]}>
                <Ionicons name={icon} size={20} color={isDark ? '#FFF' : '#64748B'} />
            </View>
            <View style={styles.fieldContent}>
                <Text style={styles.fieldLabel}>{label}</Text>
                {isEditing ? (
                    <TextInput
                        style={[styles.input, isDark && styles.inputDark]}
                        value={userData[key]}
                        onChangeText={(text) => setUserData({ ...userData, [key]: text })}
                        placeholder={placeholder}
                        placeholderTextColor="#94A3B8"
                    />
                ) : (
                    <Text style={[styles.fieldValue, isDark && styles.textWhite]}>{userData[key]}</Text>
                )}
            </View>
        </View>
    );

    return (
        <ScreenLayout
            title={t('profile', 'Profil')}
            containerStyle={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
            headerRight={
                <TouchableOpacity onPress={toggleEdit} style={styles.iconButton}>
                    <Ionicons
                        name={isEditing ? "checkmark-circle" : "create-outline"}
                        size={28}
                        color={isDark ? '#FFF' : '#007AFF'}
                    />
                </TouchableOpacity>
            }
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Avatar Section */}
                <View style={[
                    styles.profileHeader,
                    isDark && styles.cardDark,
                    isEditing && styles.editingBorder // Visual Feedback
                ]}>
                    <TouchableOpacity onPress={pickImage} disabled={!isEditing} style={styles.avatarContainer}>
                        <View style={[styles.avatar, { backgroundColor: isDark ? '#334155' : '#E2E8F0' }]}>
                            {avatarUri ? (
                                <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                            ) : (
                                <Ionicons name="person" size={48} color={isDark ? '#FFF' : '#94A3B8'} />
                            )}
                        </View>
                        {isEditing && (
                            <View style={styles.cameraBadge}>
                                <Ionicons name="camera" size={16} color="#FFF" />
                            </View>
                        )}
                    </TouchableOpacity>
                    <Text style={[styles.nameText, isDark && styles.textWhite]}>{userData.name}</Text>
                    <Text style={styles.statusText}>{userData.bio}</Text>
                </View>

                {/* Info Section */}
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('personal_info', 'Shaxsiy ma\'lumotlar')}</Text>

                    <View style={[styles.card, isDark && styles.cardDark]}>
                        {renderField(t('name', 'Ism Familya'), 'name', 'person-outline', 'Ismingizni kiriting')}
                        <View style={[styles.divider, isDark && { backgroundColor: '#334155' }]} />
                        {renderField(t('phone', 'Telefon'), 'phone', 'call-outline', '+998...')}
                        <View style={[styles.divider, isDark && { backgroundColor: '#334155' }]} />
                        {renderField(t('region', 'Hudud'), 'region', 'location-outline', 'Hududingiz')}
                    </View>
                </View>

                {/* Additional Settings (Mock) */}
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, isDark && styles.textWhite]}>{t('account', 'Hisob')}</Text>
                    <View style={[styles.card, isDark && styles.cardDark]}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Security')}>
                            <View style={[styles.iconBox, { backgroundColor: '#F0F9FF' }]}>
                                <Ionicons name="shield-checkmark" size={20} color="#0EA5E9" />
                            </View>
                            <Text style={[styles.menuText, isDark && styles.textWhite]}>{t('security', 'Xavfsizlik')}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                        </TouchableOpacity>
                        <View style={[styles.divider, isDark && { backgroundColor: '#334155' }]} />
                        <TouchableOpacity style={styles.menuItem}>
                            <View style={[styles.iconBox, { backgroundColor: '#FEF2F2' }]}>
                                <Ionicons name="log-out" size={20} color="#EF4444" />
                            </View>
                            <Text style={[styles.menuText, { color: '#EF4444' }]}>{t('logout', 'Chiqish')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 120,
    },
    // Header
    iconButton: {
        padding: 4,
    },
    // Removed editButtonText
    profileHeader: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardDark: {
        backgroundColor: '#1E293B',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Mask image
    },
    avatarImage: {
        width: 100,
        height: 100,
    },
    editingBorder: {
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007AFF',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    nameText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 4,
    },
    statusText: {
        fontSize: 14,
        color: '#64748B',
    },
    textWhite: {
        color: '#FFF',
    },
    // Sections
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 12,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        overflow: 'hidden',
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginLeft: 56, // Inset
    },
    // Fields
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    fieldContainerDark: {
        // bg handled by card
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    fieldContent: {
        flex: 1,
    },
    fieldLabel: {
        fontSize: 12,
        color: '#94A3B8',
        marginBottom: 2,
    },
    fieldValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1E293B',
    },
    input: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1E293B',
        padding: 0,
        height: 24,
    },
    inputDark: {
        color: '#FFF',
    },
    // Menu
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#1E293B',
    },
});

export default ProfileScreen;

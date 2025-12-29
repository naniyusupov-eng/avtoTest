import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import TicketsScreen from '../screens/TicketsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import * as Haptics from 'expo-haptics';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: isDark ? '#1a1a1a' : '#fff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: isDark ? 0.2 : 0.05,
                    shadowRadius: 2,
                    elevation: 2,
                },
                headerTintColor: isDark ? '#fff' : '#000',
                headerTitleStyle: {
                    fontSize: 17,
                    fontWeight: '600',
                },
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Tickets') {
                        iconName = focused ? 'document-text' : 'document-text-outline';
                    } else if (route.name === 'Statistics') {
                        iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: isDark ? '#63B3ED' : '#0056D2', // High Contrast Brand Blue
                tabBarInactiveTintColor: isDark ? '#94A3B8' : '#64748B', // Slate Gray
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: isDark ? '#1E293B' : '#FFFFFF', // Slate 800 vs White
                    position: 'absolute',
                    bottom: 25,
                    marginHorizontal: 20,
                    height: 64,
                    borderRadius: 32,
                    shadowColor: isDark ? '#000' : '#0056D2', // Colored shadow for identity
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: isDark ? 0.4 : 0.15,
                    shadowRadius: 16,
                    elevation: 10,
                    borderTopWidth: 0,
                },
                tabBarItemStyle: {
                    paddingVertical: 10,
                    // justifyContent: 'center',
                }
            })}
            screenListeners={{
                tabPress: () => {
                    Haptics.selectionAsync();
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('home') }} />
            <Tab.Screen name="Tickets" component={TicketsScreen} options={{ title: t('tickets'), headerShown: false }} />
            <Tab.Screen name="Statistics" component={StatisticsScreen} options={{ title: t('statistics', 'Statistika') }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t('profile', 'Profil') }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings') }} />
        </Tab.Navigator>
    );
}

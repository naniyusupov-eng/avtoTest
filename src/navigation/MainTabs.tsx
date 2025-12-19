import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import TicketsScreen from '../screens/TicketsScreen';
import SignsScreen from '../screens/SignsScreen';
import RulesScreen from '../screens/RulesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

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
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Tickets') {
                        iconName = focused ? 'document-text' : 'document-text-outline';
                    } else if (route.name === 'Signs') {
                        iconName = focused ? 'stop-circle' : 'stop-circle-outline';
                    } else if (route.name === 'Rules') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: isDark ? '#1a1a1a' : '#fff',
                    borderTopColor: 'transparent',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -1 },
                    shadowOpacity: isDark ? 0.2 : 0.05,
                    shadowRadius: 3,
                    elevation: 3,
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: t('home') }} />
            <Tab.Screen name="Tickets" component={TicketsScreen} options={{ title: t('tickets') }} />
            <Tab.Screen name="Signs" component={SignsScreen} options={{ title: t('signs') }} />
            <Tab.Screen name="Rules" component={RulesScreen} options={{ title: t('rules') }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: t('settings') }} />
        </Tab.Navigator>
    );
}

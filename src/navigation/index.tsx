import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from '../screens/WelcomeScreen';
import MainTabs from './MainTabs';
import MarkingsScreen from '../screens/MarkingsScreen';
import SignsDetailScreen from '../screens/SignsDetailScreen';
import TicketDetailScreen from '../screens/TicketDetailScreen';
import SignsListScreen from '../screens/SignsListScreen';
import TariflarScreen from '../screens/TariflarScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';



const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    const commonHeaderOptions: any = {
        headerShown: true,
        headerBackVisible: false,
        headerStyle: {
            backgroundColor: isDark ? '#1a1a1a' : '#fff',
        },
        headerTitleStyle: {
            fontSize: 17,
            fontWeight: '600' as const,
            color: isDark ? '#fff' : '#000',
        },
    };

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        animation: 'fade',
                        presentation: 'card',
                    }}
                >
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="Main" component={MainTabs} />
                    <Stack.Screen
                        name="Markings"
                        component={MarkingsScreen}
                        options={{
                            ...commonHeaderOptions,
                            title: t('road_markings'),
                        }}
                    />
                    <Stack.Screen
                        name="SignsDetail"
                        component={SignsDetailScreen}
                        options={{
                            ...commonHeaderOptions,
                            title: t('road_signs'),
                        }}
                    />
                    <Stack.Screen
                        name="TicketDetail"
                        component={TicketDetailScreen}
                        options={({ route }: any) => ({
                            ...commonHeaderOptions,
                            title: `${t('tickets')} №${route?.params?.ticketNumber || ''}`,
                        })}
                    />
                    <Stack.Screen
                        name="SignsList"
                        component={SignsListScreen}
                        options={({ route }: any) => ({
                            ...commonHeaderOptions,
                            title: route?.params?.title || t('road_signs'),
                        })}
                    />
                    <Stack.Screen
                        name="Tariflar"
                        component={TariflarScreen}
                        options={{
                            ...commonHeaderOptions,
                            title: t('tariflar'),
                        }}
                    />
                    <Stack.Screen
                        name="ComingSoon"
                        component={ComingSoonScreen}
                        options={({ route }: any) => ({
                            ...commonHeaderOptions,
                            title: route?.params?.title || t('coming_soon'),
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

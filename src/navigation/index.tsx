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
import RuleDetailScreen from '../screens/RuleDetailScreen';
import LanguageScreen from '../screens/LanguageScreen';
import SignsScreen from '../screens/SignsScreen';
import RulesScreen from '../screens/RulesScreen';
import { SecurityScreen } from '../screens/SecurityScreen';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';



const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    const { t } = useTranslation();
    const { isDark } = useTheme();

    const commonHeaderOptions: any = {
        headerShown: false,
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
                    <Stack.Screen
                        name="RuleDetail"
                        component={RuleDetailScreen}
                        options={{
                            ...commonHeaderOptions,
                            title: t('rules'),
                        }}
                    />
                    <Stack.Screen
                        name="Language"
                        component={LanguageScreen}
                        options={{
                            ...commonHeaderOptions,
                            title: t('language'),
                        }}
                    />
                    <Stack.Screen
                        name="Signs"
                        component={SignsScreen}
                        options={{
                            ...commonHeaderOptions,
                            title: t('signs'),
                            headerShown: false, // Signs has its own ScreenLayout with title
                        }}
                    />
                    <Stack.Screen
                        name="Rules"
                        component={RulesScreen}
                        options={{
                            ...commonHeaderOptions,
                            title: t('rules'),
                            headerShown: false, // Rules has its own ScreenLayout with title
                        }}
                    />
                    <Stack.Screen
                        name="Security"
                        component={SecurityScreen}
                        options={{
                            ...commonHeaderOptions,
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

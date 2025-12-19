import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language resources
import ru from './ru';
import uz from './uz';
import uz_cyrl from './uz_cyrl';

const resources = {
    ru,
    uz,
    uz_cyrl,
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const languageDetector: any = {
    type: 'languageDetector',
    async: true, // flags below detection to be async
    detect: async (callback: any) => {
        try {
            const savedLanguage = await AsyncStorage.getItem('user-language');
            const language = savedLanguage || 'uz';
            callback(language);
        } catch (error) {
            callback('uz');
        }
    },
    init: () => { },
    cacheUserLanguage: async (lng: string) => {
        try {
            await AsyncStorage.setItem('user-language', lng);
        } catch (error) { }
    },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'uz',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
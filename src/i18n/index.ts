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

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'uz', // default language
        fallbackLng: 'uz',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
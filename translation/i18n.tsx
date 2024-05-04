import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules'

import transBg from './Bg/translation.json';
import transEn from './En/translation.json';

const resources = {
    bg: {translation: transBg},
    en: {translation: transEn}
};

i18next
.use(initReactI18next)
.init({
    resources,
    lng: 'bg'
});

export default i18next;
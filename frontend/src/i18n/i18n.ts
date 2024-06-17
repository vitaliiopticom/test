import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { ENV_CONFIG } from '@/config/env';

import { LANGS } from './langs';
import { NAMESPACES } from './namespaces';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${ENV_CONFIG.TRANSLATIONS_URL}/{{lng}}/{{ns}}.json`,
    },
    fallbackLng: LANGS[0].code,
    ns: Object.values(NAMESPACES),
    defaultNS: NAMESPACES.Common,
    supportedLngs: LANGS.map((lng) => lng.code),
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

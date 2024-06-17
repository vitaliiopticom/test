import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import { DEBUG_LANG, Lang, LANGS, useTranslation } from '@/i18n';
import { useProfile } from '@/modules/users';

type Props = {
  children: ReactNode;
};

export type LangContextType = {
  profileDefaultLang: Lang | undefined;
  debugMode: boolean;
  toggleDebugMode: () => void;
};

const LangContext = createContext<LangContextType>({} as LangContextType);

export const LangProvider: FC<Props> = ({ children }) => {
  const { profile } = useProfile();
  const { i18n } = useTranslation();
  const debugMode = i18n.language === DEBUG_LANG.code;

  const profileDefaultLang = useMemo(() => {
    return (
      LANGS.find((item) => profile?.defaultLanguageId === item.code) || LANGS[0]
    );
  }, [profile?.defaultLanguageId]);

  const toggleDebugMode = useCallback(() => {
    i18n.changeLanguage(debugMode ? profileDefaultLang.code : DEBUG_LANG.code);
  }, [i18n, profileDefaultLang.code, debugMode]);

  useEffect(() => {
    if (i18n.language !== profile?.defaultLanguageId) {
      i18n.changeLanguage(profile?.defaultLanguageId);
    }
    // eslint-disable-next-line
  }, [profile?.defaultLanguageId]);

  return (
    <LangContext.Provider
      value={{ profileDefaultLang, debugMode, toggleDebugMode }}
    >
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);

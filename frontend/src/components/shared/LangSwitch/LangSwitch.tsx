import { FC, useMemo } from 'react';

import { Button, Dropdown } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { LANGS } from '@/i18n/langs';

import { HeaderIcon } from '../Header/elements/HeaderIcon';

export const LangSwitch: FC = () => {
  const { i18n } = useTranslation();

  const currentLang = useMemo(() => {
    return LANGS.find((item) => item.code === i18n.language) || LANGS[0];
  }, [i18n.language]);

  const handleLangChange = (lang: string) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <Dropdown
      items={LANGS}
      render={({ defaultClassName, item }) => (
        <Button
          className={defaultClassName}
          startIcon={item.icon}
          variant="ghost"
          onClick={() => handleLangChange(item.code)}
        >
          {item.label}
        </Button>
      )}
    >
      <HeaderIcon name={currentLang.icon} title={currentLang.label} />
    </Dropdown>
  );
};

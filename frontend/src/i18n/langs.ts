import type { IconName } from '@/components/elements';

export type Lang = {
  label: string;
  code: string;
  icon: IconName;
};

export const LANGS: Lang[] = [
  {
    code: 'en',
    label: 'English',
    icon: 'gbFlag',
  },
  {
    code: 'fr',
    label: 'Français',
    icon: 'frFlag',
  },
  {
    code: 'es',
    label: 'Español',
    icon: 'esFlag',
  },
  {
    code: 'de',
    label: 'Deutsch',
    icon: 'deFlag',
  },
];

export const DEBUG_LANG: Lang = {
  code: 'cimode',
  label: 'Debug',
  icon: 'audit',
};

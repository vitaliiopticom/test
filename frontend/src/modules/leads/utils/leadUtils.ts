import { LANGS } from '@/i18n';

export const genderOptions = ['MRS', 'MR'];

export const getGenderOptions = (t: any) => [
  { label: t('common.mrs'), value: genderOptions[0] },
  { label: t('common.mr'), value: genderOptions[1] },
];


export const languageOptions = LANGS.map((lang) => ({
  id: lang.code,
  name: lang.label,
}));
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  InputField,
  PhoneInputField,
  RadioGroupField,
  useFormContext,
} from '@/components/shared';
import { useTranslation } from '@/i18n';

import { UserLanguageSelect } from './UserLanguageSelect';

type Props = {
  disableEmail?: boolean;
};

export const PersonalInfo: FC<Props> = ({ disableEmail }) => {
  const { t } = useTranslation();
  const { setFocus } = useFormContext();
  const location = useLocation();
  const key = location.key;
  const { fieldToFocus } = location?.state || {};

  useEffect(() => {
    setFocus(fieldToFocus);
    // eslint-disable-next-line
  }, [fieldToFocus, key]);

  const genderOptions = [
    { label: t('common.mrs'), value: 'FEMALE' },
    { label: t('common.mr'), value: 'MALE' },
  ];

  return (
    <div className="grid-col grid gap-4">
      <div>
        <RadioGroupField
          label={t('common.title')}
          name="gender"
          options={genderOptions}
          isRequired
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InputField label={t('common.firstname')} name="firstname" isRequired />
        <InputField label={t('common.lastname')} name="lastname" isRequired />
      </div>

      <InputField
        disabled={disableEmail}
        label={t('common.email')}
        name="email"
        type="email"
        isRequired
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PhoneInputField label={t('common.phoneNumber')} name="phoneNumber" />
        <PhoneInputField label={t('common.mobileNumber')} name="mobileNumber" />
        <UserLanguageSelect
          isClearable={false}
          label={t('common.defaultLanguage')}
          name="defaultLanguageId"
          isRequired
        />
      </div>
    </div>
  );
};

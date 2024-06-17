import { FC } from 'react';

import { Image, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';

import { Page } from '../Page/Page';

export const AccessDenied: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <div className="flex min-h-layoutNoHeader items-center justify-center">
        <div className="grid justify-center justify-items-center gap-2.5">
          <Image
            alt="General error"
            className="mb-3"
            src={'/images/access-denied.svg'}
          />
          <Text className="text-center text-5xl font-semibold">
            {t('Error.AccessDenied.title')}
          </Text>
          <Text className="text-center text-lg font-semibold">
            {t('Error.AccessDenied.line')}
          </Text>
        </div>
      </div>
    </Page>
  );
};

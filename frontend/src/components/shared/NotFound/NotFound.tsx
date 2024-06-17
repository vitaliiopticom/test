import { FC } from 'react';

import { Image, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';

import { Page } from '../Page/Page';

export const NotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <div className="flex min-h-layoutNoHeader items-center justify-center">
        <div className="grid justify-center justify-items-center gap-2.5">
          <Image
            alt="Not found"
            className="mb-3"
            src={'/images/page-not-found.svg'}
          />
          <Text className="text-center text-5xl font-semibold">
            {t('Error.PageNotFound.title')}
          </Text>
          <Text className="text-center text-lg font-semibold">
            {t('Error.PageNotFound.line1')}
            <br />
            {t('Error.PageNotFound.line2')}
          </Text>
        </div>
      </div>
    </Page>
  );
};

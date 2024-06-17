import { FC } from 'react';

import { Button, Image, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';

import { Page } from '../Page/Page';

const refreshPage = () => {
  window.location.reload();
};

export const GeneralError: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <div className="flex min-h-layoutNoHeader items-center justify-center">
        <div className="grid justify-center justify-items-center gap-2.5">
          <Image
            alt="General error"
            className="mb-3"
            src={'/images/general-error.svg'}
          />
          <Text className="text-center text-5xl font-semibold">
            {t('Error.GeneralError.title')}
          </Text>
          <Text className="mb-8 text-center text-lg font-semibold">
            {t('Error.GeneralError.line')}
          </Text>
          <Button
            size="md"
            startIcon="refresh"
            variant="secondary"
            onClick={refreshPage}
          >
            {t('common.refreshPage')}
          </Button>
        </div>
      </div>
    </Page>
  );
};

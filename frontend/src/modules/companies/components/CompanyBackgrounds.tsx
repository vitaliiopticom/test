import React from 'react';

import { getErrorMessage } from '@/api/utils';
import { Skeleton } from '@/components/elements';
import { MessageVariant, PageMessage } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useGetCompanyBackgroundByCompanyIdQuery } from '../api/getCompanyBackgroundByCompanyId';
import { CompanyImages } from '../components/CompanyImages';
import { PAGE_MESSAGES_NO_BACKGROUNDS } from '../constants';

type Props = {
  companyId: number;
};

export const CompanyBackgrounds: React.FC<Props> = ({ companyId }) => {
  const { t } = useTranslation();

  const { data, loading, error } = useGetCompanyBackgroundByCompanyIdQuery({
    variables: {
      input: {
        companyId,
      },
    },
  });

  if (loading) {
    return <Skeleton className="h-40" />;
  }

  if (error) {
    const errorMessage = getErrorMessage(t, error.graphQLErrors);

    return (
      <div className="min-h-[10rem]">
        <PageMessage
          messages={{
            messageLine1: Array.isArray(errorMessage)
              ? errorMessage.join()
              : errorMessage,
          }}
          variant={MessageVariant.ERROR}
        />
        ;
      </div>
    );
  }

  return (
    <CompanyImages
      images={data?.companyBackgroundsByCompanyId ?? []}
      pageMessage={PAGE_MESSAGES_NO_BACKGROUNDS}
    />
  );
};

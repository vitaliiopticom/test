import React from 'react';

import { getErrorMessage } from '@/api/utils';
import { Skeleton } from '@/components/elements';
import { MessageVariant, PageMessage } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useGetCompanyLicensePlatesByCompanyIdQuery } from '../api/getCompanyLicensePlatesByCompanyId';
import { CompanyImages } from '../components/CompanyImages';
import { PAGE_MESSAGES_NO_LICENSE_PLATE } from '../constants';

type Props = {
  companyId: number;
};

export const CompanyLicensePlates: React.FC<Props> = ({ companyId }) => {
  const { t } = useTranslation();

  const { data, loading, error } = useGetCompanyLicensePlatesByCompanyIdQuery({
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
      images={data?.companyLicensePlatesByCompanyId ?? []}
      pageMessage={PAGE_MESSAGES_NO_LICENSE_PLATE}
    />
  );
};

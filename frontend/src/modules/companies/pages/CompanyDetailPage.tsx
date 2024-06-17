import { FC, ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/elements';
import { QueryDataLoader } from '@/components/shared';
import { PageWithTabs } from '@/components/shared/Page/PageWithTabs';
import { TabElement } from '@/components/shared/Tabs';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { routes } from '@/router/routesList';
import { formatDate } from '@/utils/date';
import { trimLeadingZerosAfterPrefix } from '@/utils/phone';

import { useGetCompanyByIdQuery } from '../api/getCompany';
import { useGetCompanyProfileByIdQuery } from '../api/getCompanyProfile';
import { useUpdateCompanyMutation } from '../api/updateCompany';
import { CompanyDetailForm } from '../components/CompanyDetailForm';
import { CompanyDetailSkeleton } from '../components/CompanyDetailSkeleton';
import { GetCompanyDetailTabs } from '../components/CompanyDetailTabs';
import { CONTRACT_STATUS } from '../constants';
import { Company, CompanyDetailParams, CompanyFormValues } from '../types';

export const CompanyDetailPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '0' } = useParams<CompanyDetailParams>();

  const canViewMarketingDetails = usePermissions(
    PERMISSIONS.MarketingDetails_View,
  );
  const canEditCompany = usePermissions(PERMISSIONS.Companies_Edit);
  const companyId = parseInt(id);

  const getCompanyByIdQuery = useGetCompanyByIdQuery({
    variables: { id: companyId },
    skip: !canEditCompany,
  });
  const getCompanyProfileByIdQuery = useGetCompanyProfileByIdQuery({
    variables: { id: companyId },
    skip: canEditCompany,
  });

  const [updateCompany, updateCompanyState] = useUpdateCompanyMutation({
    onCompleted: () => {
      navigate(routes.companies());
    },
  });

  const isContractSigned =
    getCompanyByIdQuery?.data?.company?.contractState?.state ===
    CONTRACT_STATUS.SIGNED;

  const companyDetailTabs: TabElement[] = GetCompanyDetailTabs(
    t,
    canViewMarketingDetails && isContractSigned,
    canEditCompany,
  );

  const handleUpdateCompany = (values: CompanyFormValues) => {
    if (!canEditCompany) return;

    const {
      turnover,
      foundingDate,
      streetNumber,
      googleRating,
      contactPhoneNumber,
      ...restValues
    } = values;

    const parsedTurnover = turnover ? parseFloat(turnover) : null;
    const parsedFoundingDate = foundingDate
      ? formatDate(foundingDate as Date, 'MM/dd/yyyy')
      : null;
    const parsedContactPhoneNumber =
      trimLeadingZerosAfterPrefix(contactPhoneNumber);
    const contactId = getCompanyByIdQuery?.data?.company.contactId;
    const optionalContactId = contactId ? { contactId } : {};

    updateCompany({
      variables: {
        input: {
          id: parseInt(id),
          turnover: parsedTurnover,
          foundingDate: parsedFoundingDate,
          streetNumber: streetNumber || null,
          googleRating: googleRating || null,
          contactPhoneNumber: parsedContactPhoneNumber,
          ...optionalContactId,
          ...restValues,
        },
      },
    });
  };

  const renderForm = (company: Company, node: ReactNode): ReactNode => (
    <CompanyDetailForm
      company={company}
      isEditMode={canEditCompany}
      isSubmitting={updateCompanyState.loading}
      onSubmit={handleUpdateCompany}
    >
      {node}
    </CompanyDetailForm>
  );

  const companyTitle = canEditCompany
    ? getCompanyByIdQuery?.data?.company.companyName
    : getCompanyProfileByIdQuery?.data?.companyProfile.companyName;

  return (
    <PageWithTabs
      actions={
        <>
          <Button
            variant="ghost"
            onClick={() =>
              canEditCompany ? navigate(routes.companies()) : navigate(-1)
            }
          >
            {t(`common.${canEditCompany ? 'cancel' : 'back'}`)}
          </Button>
          {canEditCompany && (
            <Button
              form="updateCompanyForm"
              isLoading={updateCompanyState.loading}
              type="submit"
            >
              {t('common.save')}
            </Button>
          )}
        </>
      }
      backButton={canEditCompany}
      render={(node) =>
        canEditCompany ? (
          <QueryDataLoader
            loader={<CompanyDetailSkeleton />}
            query={getCompanyByIdQuery}
          >
            {({ data }) => renderForm(data.company, node)}
          </QueryDataLoader>
        ) : (
          <QueryDataLoader
            loader={<CompanyDetailSkeleton />}
            query={getCompanyProfileByIdQuery}
          >
            {({ data }) => renderForm(data.companyProfile, node)}
          </QueryDataLoader>
        )
      }
      tabs={companyDetailTabs}
      title={companyTitle}
    />
  );
};

import { FC, useMemo, useState } from 'react';

import { FormModalWithTabs } from '@/components/shared';
import { useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { formatDate } from '@/utils/date';
import { trimLeadingZerosAfterPrefix } from '@/utils/phone';

import { useCreateCompanyMutation } from '../api/createCompany';
import { defaultValuesCreateCompany } from '../constants';
import type {
  CompanyFormValues,
  FieldsAdminLegalType,
  FieldsClientRelationType,
  FieldsCompanyOwnerType,
  FieldsCompanyType,
  FieldsMainContactType,
  FieldsTeamStatusType,
} from '../types';

import {
  FieldsAdminLegal,
  FieldsClientRelation,
  FieldsCompany,
  FieldsCompanyOwner,
  FieldsMainContact,
  FieldsTeamStatus,
} from './FieldsGroups';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CompanyFormModal: FC<Props> = ({ isOpen, onClose }) => {
  const [successSubmitCount, setSuccessSubmitCount] = useState(0);

  const { t } = useTranslation();
  const formValidation = useFormValidation();
  const [createCompany, createCompanyState] = useCreateCompanyMutation({
    onCompleted: () => {
      onClose();
      setSuccessSubmitCount((prev) => prev + 1);
    },
  });

  const schemas = useMemo(
    () => ({
      company: {
        parentEntity: formValidation.string(true),
        companyName: formValidation.string(),
        companyNickname: formValidation.string(true),
        legalFormId: formValidation.number(),
        turnover: formValidation.string(true),
        foundingDate: formValidation.date(true),
      },
      adminLegal: {
        corporatePurpose: formValidation.string(true),
        internationalVATNumber: formValidation.string(true),
        companyRegistrationNumber: formValidation.string(true),
        streetName: formValidation.string(true),
        streetNumber: formValidation.string(true),
        additionalAddress: formValidation.string(true),
        postalCode: formValidation.string(true),
        city: formValidation.string(true),
        state: formValidation.string(true),
        country: formValidation.number(true),
        approvedSignatoryName: formValidation.string(true),
        approvedSignatoryLastName: formValidation.string(true),
        approvedSignatoryCourtesy: formValidation.number(true),
        approvedSignatoryJobFunction: formValidation.number(true).array(),
        approvedSignatoryJobTitle: formValidation.number(true).array(),
      },
      teamStatus: {
        teamStatus: formValidation
          .number()
          .array()
          .nonempty(t('fieldError.mandatoryOption')),
      },
      clientRelation: {
        aeroAutofactoria: formValidation.number(true),
        tyrefactoria: formValidation.number(true).array(),
        innovafleet: formValidation.number(true).array(),
        audit: formValidation.number(true),
        optiPix: formValidation.number(true),
        qualiphone: formValidation.number(true),
        optiAds: formValidation.number(true),
        optiConfig: formValidation.number(true),
        optiValue: formValidation.number(true),
        optiContent: formValidation.number(true),
        optiLeads: formValidation.number(true),
        customerRecoveryBundle: formValidation.number(true),
        whiteLabelWeb: formValidation.number(true),
      },
      owner: {
        companyOwner: formValidation.number(true),
        assistantOwner: formValidation.number(true),
        clientITSystems: formValidation.number(true).array(),
        nameClientITSystem: formValidation.string(true),
        googleRating: formValidation.string(true),
        websiteURL: formValidation.string(true),
        googleMyBusinessLink: formValidation.string(true),
        linkedInCompanyPage: formValidation.string(true),
      },
      mainContact: {
        contactCourtesy: formValidation.number(true),
        contactFirstName: formValidation.string(true),
        contactLastName: formValidation.string(true),
        contactJobTitle: formValidation.string(true),
        contactFunction: formValidation.number(true).array(),
        contactEmail: formValidation.email(true),
        contactPhoneNumber: formValidation.phoneNumber(true),
        contactDefaultLanguage: formValidation.number(true),
        officialCarDealer: formValidation.number(true).array(), //no field in form, sending to avoid submit error
      },
    }),
    [formValidation, t],
  );

  const tabs = useMemo(
    () => [
      {
        title: t('common.company'),
        schema: formValidation.schema<FieldsCompanyType>(schemas.company),
        content: <FieldsCompany mode="add" />,
      },
      {
        title: t('companies.adminLegal'),
        schema: formValidation.schema<FieldsAdminLegalType>(schemas.adminLegal),
        content: <FieldsAdminLegal mode="add" />,
      },
      {
        title: t('companies.teamStatus'),
        schema: formValidation.schema<FieldsTeamStatusType>(schemas.teamStatus),
        content: <FieldsTeamStatus mode="add" />,
      },
      {
        title: t('companies.clientRelation'),
        schema: formValidation.schema<FieldsClientRelationType>(
          schemas.clientRelation,
        ),
        content: <FieldsClientRelation mode="add" />,
      },
      {
        title: t('common.owner'),
        schema: formValidation.schema<FieldsCompanyOwnerType>(schemas.owner),
        content: <FieldsCompanyOwner mode="add" />,
      },
      {
        title: t('common.mainContact'),
        schema: formValidation.schema<FieldsMainContactType>(
          schemas.mainContact,
        ),
        content: <FieldsMainContact mode="add" />,
      },
    ],
    [
      t,
      formValidation,
      schemas.company,
      schemas.adminLegal,
      schemas.teamStatus,
      schemas.clientRelation,
      schemas.owner,
      schemas.mainContact,
    ],
  );

  const handleCreateCompany = (values: CompanyFormValues) => {
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

    createCompany({
      variables: {
        input: {
          turnover: parsedTurnover,
          foundingDate: parsedFoundingDate,
          streetNumber: streetNumber || null,
          googleRating: googleRating || null,
          contactPhoneNumber: parsedContactPhoneNumber,
          ...restValues,
        },
      },
    });
  };

  return (
    <>
      <FormModalWithTabs
        defaultValues={defaultValuesCreateCompany}
        isOpen={isOpen}
        isSubmitting={createCompanyState.loading}
        successSubmitCount={successSubmitCount}
        tabs={tabs}
        title={t('companies.addNew')}
        onClose={onClose}
        onSubmit={handleCreateCompany}
      />
    </>
  );
};

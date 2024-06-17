import { FC, ReactNode, useMemo } from 'react';

import { Form, FormPrompt } from '@/components/shared';
import { useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';
import { getIdsList } from '@/utils/array';

import { Company, CompanyFormValues } from '../types';

type Props = {
  isSubmitting: boolean;
  company: Company;
  onSubmit: (values: CompanyFormValues) => void;
  children: ReactNode;
  isEditMode?: boolean;
};

export const CompanyDetailForm: FC<Props> = ({
  company,
  onSubmit,
  children,
  isEditMode,
}) => {
  const { t } = useTranslation();
  const formValidation = useFormValidation();

  const schema = useMemo(
    () =>
      formValidation.schema<CompanyFormValues>({
        parentEntity: formValidation.string(true),
        companyName: formValidation.string(),
        companyNickname: formValidation.string(true),
        legalFormId: formValidation.number(),
        turnover: formValidation.string(true),
        foundingDate: formValidation.date(true),

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

        teamStatus: formValidation
          .number()
          .array()
          .nonempty(t('fieldError.mandatoryOption')),

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

        companyOwner: formValidation.number(true),
        assistantOwner: formValidation.number(true),
        clientITSystems: formValidation.number(true).array(),
        nameClientITSystem: formValidation.string(true),
        googleRating: formValidation.string(true),
        websiteURL: formValidation.string(true),
        googleMyBusinessLink: formValidation.string(true),
        linkedInCompanyPage: formValidation.string(true),

        contactCourtesy: formValidation.number(true),
        contactFirstName: formValidation.string(true),
        contactLastName: formValidation.string(true),
        contactJobTitle: formValidation.string(true),
        contactFunction: formValidation.number(true).array(),
        contactEmail: formValidation.email(true),
        contactPhoneNumber: formValidation.phoneNumber(true),
        contactDefaultLanguage: formValidation.number(true),
        officialCarDealer: formValidation.number(true).array(), //no field in form, sending to avoid submit error
      }),
    [t, formValidation],
  );

  const defaultValues: Partial<CompanyFormValues> = useMemo(
    () => ({
      parentEntity: company?.parentEntity?.name,
      companyName: company?.companyName,
      companyNickname: company?.companyNickname,
      legalFormId: company?.legalFormId?.id || null,
      turnover: company?.turnover ? company?.turnover?.toString() : '',
      foundingDate: company?.foundingDate
        ? new Date(company?.foundingDate)
        : '',

      corporatePurpose: company?.corporatePurpose,
      internationalVATNumber: company?.internationalVATNumber,
      companyRegistrationNumber: company?.companyRegistrationNumber,
      streetName: company?.streetName,
      streetNumber: company?.streetNumber ?? '',
      additionalAddress: company?.additionalAddress,
      postalCode: company?.postalCode,
      city: company?.city,
      state: company?.state,
      country: company?.country?.id || null,
      approvedSignatoryName: company?.approvedSignatoryName,
      approvedSignatoryLastName: company?.approvedSignatoryLastName,
      approvedSignatoryCourtesy: company?.approvedSignatoryCourtesy?.id || null,
      approvedSignatoryJobFunction: getIdsList(
        company?.approvedSignatoryJobFunction,
      ),
      approvedSignatoryJobTitle: getIdsList(company?.approvedSignatoryJobTitle),

      teamStatus: getIdsList(company?.teamStatus),

      aeroAutofactoria: company?.aeroAutofactoria?.id || null,
      tyrefactoria: getIdsList(company?.tyrefactoria),
      innovafleet: getIdsList(company?.innovafleet),
      audit: company?.audit?.id || null,
      optiPix: company?.optiPix?.id || null,
      qualiphone: company?.qualiphone?.id || null,
      optiAds: company?.optiAds?.id || null,
      optiConfig: company?.optiConfig?.id || null,
      optiValue: company?.optiValue?.id || null,
      optiContent: company?.optiContent?.id || null,
      optiLeads: company?.optiLeads?.id || null,
      customerRecoveryBundle: company?.customerRecoveryBundle?.id || null,
      whiteLabelWeb: company?.whiteLabelWeb?.id || null,

      companyOwner: company?.companyOwner?.id || null,
      assistantOwner: company?.assistantOwner?.id || null,
      clientITSystems: getIdsList(company?.clientITSystems),
      nameClientITSystem: company?.nameClientITSystem,
      googleRating: company?.googleRating ?? '',
      websiteURL: company?.websiteURL,
      googleMyBusinessLink: company?.googleMyBusinessLink,
      linkedInCompanyPage: company?.linkedInCompanyPage,

      contactCourtesy: company?.contactCourtesy?.id || null,
      contactFirstName: company?.contactFirstName ?? '',
      contactLastName: company?.contactLastName ?? '',
      contactJobTitle: company?.contactJobTitle,
      contactFunction: getIdsList(company?.contactFunction),
      contactEmail: company?.contactEmail ?? '',
      contactPhoneNumber: company?.contactPhoneNumber,
      contactDefaultLanguage: company?.contactDefaultLanguage?.id || null,
      officialCarDealer: [], //no field in form, sending to avoid submit error
    }),
    [company],
  );

  return (
    <Form
      defaultValues={defaultValues}
      disabled={!isEditMode}
      id="updateCompanyForm"
      schema={schema}
      onSubmit={onSubmit}
    >
      <div className="pb-10">{children}</div>
      <FormPrompt />
    </Form>
  );
};

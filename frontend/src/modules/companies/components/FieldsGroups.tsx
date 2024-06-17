import { FC } from 'react';

import { Separator } from '@/components/elements';
import {
  DatePickerField,
  InputField,
  PhoneInputField,
} from '@/components/shared';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import { CompanyOwnersPropertiesSelect } from './CompanyOwnersPropertiesSelect';
import { CompanyPropertiesCheckboxGroup } from './CompanyPropertiesCheckboxGroup';
import { CompanyPropertiesSelect } from './CompanyPropertiesSelect';

type Props = {
  mode: 'add' | 'edit';
  canEditCompany?: boolean;
};

type ModesStyle = {
  add: { [key: string]: string };
  edit: { [key: string]: string };
};

const wrapperStyles = 'grid grid-cols-1 gap-6 lg:grid-cols-3 w-[700px]';
const wrapperEditModeStyles = 'xl:grid-cols-5 w-auto';
const separatorEditStyles =
  'col-span-1 lg:col-span-3 xl:col-span-5 col-start-1';

export const FieldsCompany: FC<Props> = ({ mode, canEditCompany }) => {
  const { t } = useTranslation();

  const modesStyles: ModesStyle = {
    add: {},
    edit: {
      wrapper: wrapperEditModeStyles,
      legalFormId: 'col-start-1',
    },
  };

  const canViewAdminFields = mode === 'add' || canEditCompany;

  return (
    <div className={cx(wrapperStyles, modesStyles[mode].wrapper)}>
      <InputField label={t('companies.parentEntity')} name="parentEntity" />
      <InputField
        label={t('common.companyName')}
        name="companyName"
        isRequired
      />
      <InputField label={t('common.companyNickname')} name="companyNickname" />
      {canViewAdminFields && (
        <CompanyPropertiesSelect
          className={modesStyles[mode].legalFormId}
          code="legal_form"
          label={t('companies.legalFormId')}
          name="legalFormId"
          isRequired
        />
      )}
      <InputField label={t('common.turnover')} name="turnover" type="number" />
      <DatePickerField
        label={t('companies.foundingDate')}
        name="foundingDate"
      />
    </div>
  );
};

export const FieldsAdminLegal: FC<Props> = ({ mode, canEditCompany }) => {
  const { t } = useTranslation();
  const modesStyles: ModesStyle = {
    add: {
      additionalAddress: 'col-span-2',
      state: 'col-start-1',
      approvedSignatoryName: 'col-start-1',
      approvedSignatoryCourtesy: 'col-start-1',
      separator: 'col-span-3',
    },
    edit: {
      wrapper: wrapperEditModeStyles,
      streetName: 'col-start-1',
      additionalAddress: 'col-span-1 sm:col-span-2',
      separator: separatorEditStyles,
    },
  };

  const canViewAdminFields = mode === 'add' || canEditCompany;

  return (
    <div className={cx(wrapperStyles, modesStyles[mode].wrapper)}>
      <InputField
        label={t('companies.corporatePurpose')}
        name="corporatePurpose"
      />
      <InputField
        label={t('companies.internationalVATNumber')}
        name="internationalVATNumber"
      />
      <InputField
        label={t('companies.companyRegistrationNumber')}
        name="companyRegistrationNumber"
      />
      <InputField
        className={modesStyles[mode].streetName}
        label={t('common.streetName')}
        name="streetName"
      />
      <InputField
        label={t('common.streetNumber')}
        name="streetNumber"
        type="number"
      />

      <span className={modesStyles[mode].additionalAddress}>
        <InputField
          label={t('companies.additionalAddress')}
          name="additionalAddress"
        />
      </span>
      <span className="col-start-1">
        <InputField label={t('common.postalCode')} name="postalCode" />
      </span>
      <InputField label={t('common.city')} name="city" />
      <span className={modesStyles[mode].state}>
        <InputField label={t('common.state')} name="state" />
      </span>
      <CompanyPropertiesSelect
        code="pays_region_achats_"
        label={t('common.country')}
        name="country"
      />
      <Separator
        className={modesStyles[mode].separator}
        text={t('companies.approvedSignatory')}
        isSecondary
      />
      <span className={modesStyles[mode].approvedSignatoryName}>
        <InputField
          label={t('common.firstname')}
          name="approvedSignatoryName"
        />
      </span>
      <InputField
        label={t('common.lastname')}
        name="approvedSignatoryLastName"
      />
      {canViewAdminFields && (
        <>
          <span className={modesStyles[mode].approvedSignatoryCourtesy}>
            <CompanyPropertiesSelect
              code="approved_signatory_courtesy__for_contract_"
              label={t('companies.approvedSignatoryCourtesy')}
              name="approvedSignatoryCourtesy"
            />
          </span>
          <CompanyPropertiesSelect
            code="approved_signatory_job_funcion__for_contract_"
            label={t('companies.approvedSignatoryJobFunction')}
            name="approvedSignatoryJobFunction"
            isMultiple
          />
          <CompanyPropertiesSelect
            code="approved_signatory_job_title__for_contract_"
            label={t('companies.approvedSignatoryJobTitle')}
            name="approvedSignatoryJobTitle"
            isMultiple
          />
        </>
      )}
    </div>
  );
};

export const FieldsTeamStatus: FC<Props> = ({ mode }) => {
  const content = (
    <CompanyPropertiesCheckboxGroup code="team_status" name="teamStatus" />
  );

  if (mode === 'add') {
    return (
      <div className="w-[700px]">
        <div className="w-[500px] [&_label]:mb-2 [&_label]:w-[240px]">
          {content}
        </div>
      </div>
    );
  }

  if (mode === 'edit') {
    return (
      <div className="max-w-[1000px]">
        <div className="[&_label]:mb-2 [&_label]:w-[240px]">{content}</div>
      </div>
    );
  }

  return null;
};

export const FieldsClientRelation: FC<Props> = ({ mode }) => {
  const { t } = useTranslation();

  const modesStyles: ModesStyle = {
    add: {
      separator: 'col-span-3',
    },
    edit: {
      wrapper: wrapperEditModeStyles,
      separator: separatorEditStyles,
    },
  };

  return (
    <div className={cx(wrapperStyles, modesStyles[mode].wrapper)}>
      <CompanyPropertiesSelect
        code="aero_autofactoria"
        label={t('companies.aeroAutofactoria')}
        name="aeroAutofactoria"
      />
      <CompanyPropertiesSelect
        code="tyrefactoriaclientstatus"
        label={t('companies.tyrefactoria')}
        name="tyrefactoria"
        isMultiple
      />
      <CompanyPropertiesSelect
        code="innovafleet_client_status"
        label={t('companies.innovafleet')}
        name="innovafleet"
        isMultiple
      />
      <CompanyPropertiesSelect
        code="audit"
        label={t('common.audit')}
        name="audit"
      />
      <CompanyPropertiesSelect
        code="opti_pix_"
        label={t('companies.optiPix')}
        name="optiPix"
      />
      <Separator
        className={modesStyles[mode].separator}
        text={t('companies.carOpticom')}
        isSecondary
      />
      <CompanyPropertiesSelect
        code="qualiphone"
        label={t('common.qualiphone')}
        name="qualiphone"
      />
      <CompanyPropertiesSelect
        code="opti_ads_"
        label={t('companies.optiAds')}
        name="optiAds"
      />
      <CompanyPropertiesSelect
        code="opti_config_"
        label={t('companies.optiConfig')}
        name="optiConfig"
      />
      <CompanyPropertiesSelect
        code="opti_value_"
        label={t('companies.optiValue')}
        name="optiValue"
      />
      <CompanyPropertiesSelect
        code="opti_content_"
        label={t('companies.optiContent')}
        name="optiContent"
      />
      <CompanyPropertiesSelect
        code="opti_leads_"
        label={t('companies.optiLeads')}
        name="optiLeads"
      />
      <CompanyPropertiesSelect
        code="customer_recovery_bundle"
        label={t('companies.customerRecoveryBundle')}
        name="customerRecoveryBundle"
      />
      <CompanyPropertiesSelect
        code="whitelabel_web"
        label={t('companies.whiteLabelWeb')}
        name="whiteLabelWeb"
      />
    </div>
  );
};

export const FieldsCompanyOwner: FC<Props> = ({ mode, canEditCompany }) => {
  const { t } = useTranslation();

  const modesStyles: ModesStyle = {
    add: {},
    edit: {
      wrapper: wrapperEditModeStyles,
    },
  };

  const canViewAdminFields = mode === 'add' || canEditCompany;

  return (
    <div className={cx(wrapperStyles, modesStyles[mode].wrapper)}>
      {canViewAdminFields && (
        <>
          <CompanyOwnersPropertiesSelect
            code="hubspot_owner_id"
            label={t('common.companyOwner')}
            name="companyOwner"
          />

          <CompanyOwnersPropertiesSelect
            code="assistant_owner_2nd_proprietaire"
            label={t('companies.assistantOwner')}
            name="assistantOwner"
          />
          <CompanyPropertiesSelect
            code="client_it_systems"
            label={t('companies.clientITSystems')}
            name="clientITSystems"
            isMultiple
          />
        </>
      )}
      <InputField
        label={t('companies.nameClientITSystem')}
        name="nameClientITSystem"
      />
      <InputField
        label={t('companies.googleRating')}
        name="googleRating"
        type="number"
      />
      <span className="col-start-1">
        <InputField label={t('common.websiteURL')} name="websiteURL" />
      </span>
      <InputField
        label={t('companies.googleMyBusinessLink')}
        name="googleMyBusinessLink"
      />
      <InputField
        label={t('companies.linkedInCompanyPage')}
        name="linkedInCompanyPage"
      />
    </div>
  );
};

export const FieldsMainContact: FC<Props> = ({ mode, canEditCompany }) => {
  const { t } = useTranslation();
  const modesStyles: ModesStyle = {
    add: {
      courtesy: 'col-start-1',
    },
    edit: {
      wrapper: wrapperEditModeStyles,
      email: 'sm:col-span-2',
      defaultLanguage: 'mb-12',
    },
  };

  const canViewAdminFields = mode === 'add' || canEditCompany;

  return (
    <div className={cx(wrapperStyles, modesStyles[mode].wrapper)}>
      <InputField label={t('common.firstname')} name="contactFirstName" />
      <InputField label={t('common.lastname')} name="contactLastName" />
      {canViewAdminFields && (
        <CompanyPropertiesSelect
          className={modesStyles[mode].courtesy}
          code="salutation"
          label={t('common.courtesy')}
          name="contactCourtesy"
        />
      )}
      <InputField label={t('companies.jobTitle')} name="contactJobTitle" />
      {canViewAdminFields && (
        <CompanyPropertiesSelect
          code="job_function_"
          label={t('companies.function')}
          name="contactFunction"
          isMultiple
        />
      )}
      <InputField
        className={modesStyles[mode].email}
        label={t('common.email')}
        name="contactEmail"
      />
      <PhoneInputField
        label={t('common.phoneNumber')}
        name="contactPhoneNumber"
      />
      {canViewAdminFields && (
        <CompanyPropertiesSelect
          className={modesStyles[mode].defaultLanguage}
          code="hs_language"
          label={t('companies.defaultLanguage')}
          name="contactDefaultLanguage"
        />
      )}
    </div>
  );
};

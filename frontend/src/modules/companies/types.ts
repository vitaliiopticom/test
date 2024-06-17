import { OnboardingStatus } from '@/modules/onboarding';

import {
  COMPANY_TYPE,
  CONTRACT_ACTIONS,
  CONTRACT_STATUS,
  PHOTOBOX_STATUS,
} from './constants';

export type Company = {
  id: number;
  parentEntity: {
    name: string;
  };
  companyName: string;
  companyNickname: string;
  legalFormId: CompanyProperty | null;
  turnover: string | null;
  foundingDate: string | Date;
  tenantId: string;

  corporatePurpose: string;
  internationalVATNumber: string;
  companyRegistrationNumber: string;
  streetName: string;
  streetNumber: string | null;
  additionalAddress: string;
  postalCode: string;
  city: string;
  state: string;
  country: CompanyProperty | null;
  approvedSignatoryName: string;
  approvedSignatoryLastName: string;
  approvedSignatoryCourtesy: CompanyProperty | null;
  approvedSignatoryJobFunction: CompanyProperty[];
  approvedSignatoryJobTitle: CompanyProperty[];

  teamStatus: CompanyProperty[];

  aeroAutofactoria: CompanyProperty | null;
  tyrefactoria: CompanyProperty[];
  innovafleet: CompanyProperty[];
  audit: CompanyProperty | null;
  optiPix: CompanyProperty;
  qualiphone: CompanyProperty | null;
  optiAds: CompanyProperty | null;
  optiConfig: CompanyProperty | null;
  optiValue: CompanyProperty | null;
  optiContent: CompanyProperty | null;
  optiLeads: CompanyProperty | null;
  customerRecoveryBundle: CompanyProperty | null;
  whiteLabelWeb: CompanyProperty | null;

  companyOwner: (CompanyProperty & { lastName: string }) | null;
  assistantOwner: (CompanyProperty & { lastName: string }) | null;
  clientITSystems: CompanyProperty[];
  nameClientITSystem: string;
  googleRating: string | null;
  websiteURL: string;
  googleMyBusinessLink: string;
  linkedInCompanyPage: string;

  contactCourtesy: CompanyProperty | null;
  contactFirstName: string;
  contactLastName: string;
  contactJobTitle: string;
  contactFunction: CompanyProperty[];
  contactEmail: string;
  contactPhoneNumber: string;
  contactDefaultLanguage: CompanyProperty | null;
  officialCarDealer: number[]; //no field in form, sending to avoid submit error
  contactId?: number;
  lastUpdate?: number;

  contractState: { id: number | null; state: ContractStatus | null };
  onboardingStatus: OnboardingStatus | null;
  photoBoxStatus: PhotoBoxStatus;
};

export type FieldsCompanyType = {
  parentEntity: string;
  companyName: string;
  companyNickname: string;
  legalFormId: number | null;
  turnover: string | null;
  foundingDate: string | Date;
};

export type FieldsAdminLegalType = {
  corporatePurpose: string;
  internationalVATNumber: string;
  companyRegistrationNumber: string;
  streetName: string;
  streetNumber: string | null;
  additionalAddress: string;
  postalCode: string;
  city: string;
  state: string;
  country: number | null;
  approvedSignatoryName: string;
  approvedSignatoryLastName: string;
  approvedSignatoryCourtesy: number | null;
  approvedSignatoryJobFunction: number[];
  approvedSignatoryJobTitle: number[];
};

export type FieldsTeamStatusType = {
  teamStatus: number[];
};

export type FieldsClientRelationType = {
  aeroAutofactoria: number | null;
  tyrefactoria: number[];
  innovafleet: number[];
  audit: number | null;
  optiPix: number | null;
  qualiphone: number | null;
  optiAds: number | null;
  optiConfig: number | null;
  optiValue: number | null;
  optiContent: number | null;
  optiLeads: number | null;
  customerRecoveryBundle: number | null;
  whiteLabelWeb: number | null;
};

export type FieldsCompanyOwnerType = {
  companyOwner: number | null;
  assistantOwner: number | null;
  clientITSystems: number[];
  nameClientITSystem: string;
  googleRating: string | null;
  websiteURL: string;
  googleMyBusinessLink: string;
  linkedInCompanyPage: string;
};

export type FieldsMainContactType = {
  contactCourtesy: number | null;
  contactFirstName: string;
  contactLastName: string;
  contactJobTitle: string;
  contactFunction: number[];
  contactEmail: string;
  contactPhoneNumber: string;
  contactDefaultLanguage: number | null;
  officialCarDealer: number[]; //no field in form, sending to avoid submit error
};

export type CompanyFormValues = FieldsCompanyType &
  FieldsAdminLegalType &
  FieldsTeamStatusType &
  FieldsClientRelationType &
  FieldsCompanyOwnerType &
  FieldsMainContactType;

export type CompanyProperty = {
  id: number;
  name: string;
  localizationKey: string;
};

export type CompanyOwnersProperty = {
  id: number;
  name: string;
  lastName: string;
};

export type CompanyPropertyCode =
  | 'legal_form'
  | 'opti_pix_'
  | 'opti_config_'
  | 'opti_ads_'
  | 'opti_leads_'
  | 'pack_relances'
  | 'approved_signatory_job_funcion__for_contract_'
  | 'pays_region_achats_'
  | 'approved_signatory_courtesy__for_contract_'
  | 'approved_signatory_job_title__for_contract_'
  | 'aero_autofactoria'
  | 'tyrefactoriaclientstatus'
  | 'innovafleet_client_status'
  | 'audit'
  | 'qualiphone'
  | 'opti_value_'
  | 'opti_content_'
  | 'customer_recovery_bundle'
  | 'whitelabel_web'
  | 'client_it_systems'
  | 'salutation'
  | 'job_function_'
  | 'team_status'
  | 'hs_language';

export type CompanyDetailParams = {
  id: string;
};

export type CompanyOwnersPropertyCode =
  | 'hubspot_owner_id'
  | 'assistant_owner_2nd_proprietaire';

export type CompanyCard = {
  name: string;
  phoneNumber: string;
  mobileNumber: string;
  email: string;
};

export type ContractStatus = keyof typeof CONTRACT_STATUS;

export type PhotoBoxStatus = keyof typeof PHOTOBOX_STATUS;

export type CompanyType = keyof typeof COMPANY_TYPE;

export type CompanyListFilters = {
  countryId: number | null;
  companyOwnerId: number | null;
  relationStatusId: number | null;
  onboardingStatusId: string | null;
  optiPixContractStatusId: string | null;
  search: string;
  parentEntityName: string;
};

export type Dealer = Pick<Company, 'id' | 'companyName'>;
export type Dealership = Pick<Company, 'tenantId' | 'companyName'>;

export type Commercial = {
  id: number;
  name: string;
  lastName: string;
};

export type CompaniesByDealerFilters = {
  search: string;
  companyType: CompanyType;
};

export type UpdateContractAction = keyof typeof CONTRACT_ACTIONS;

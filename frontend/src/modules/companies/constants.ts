import type { CompanyFormValues, CompanyListFilters } from './types';

const companyInfo = {
  parentEntity: '',
  companyName: '',
  companyNickname: '',
  legalFormId: null,
  turnover: '',
  foundingDate: '',
};

const adminLegal = {
  corporatePurpose: '',
  internationalVATNumber: '',
  companyRegistrationNumber: '',
  streetName: '',
  streetNumber: '',
  additionalAddress: '',
  postalCode: '',
  city: '',
  state: '',
  country: null,
  approvedSignatoryName: '',
  approvedSignatoryLastName: '',
  approvedSignatoryCourtesy: null,
  approvedSignatoryJobFunction: [],
  approvedSignatoryJobTitle: [],
};

const teamStatus = {
  teamStatus: [],
};

const clientRelation = {
  aeroAutofactoria: null,
  tyrefactoria: [],
  innovafleet: [],
  audit: null,
  optiPix: null,
  qualiphone: null,
  optiAds: null,
  optiConfig: null,
  optiValue: null,
  optiContent: null,
  optiLeads: null,
  customerRecoveryBundle: null,
  whiteLabelWeb: null,
};

const companyOwner = {
  companyOwner: null,
  assistantOwner: null,
  clientITSystems: [],
  nameClientITSystem: '',
  googleRating: '',
  websiteURL: '',
  googleMyBusinessLink: '',
  linkedInCompanyPage: '',
};

const mainContact = {
  contactCourtesy: null,
  contactFirstName: '',
  contactLastName: '',
  contactJobTitle: '',
  contactFunction: [],
  contactEmail: '',
  contactPhoneNumber: '',
  contactDefaultLanguage: null,
  officialCarDealer: [], //no field in form, sending to avoid submit error
};

export const defaultValuesCreateCompany: CompanyFormValues = {
  ...companyInfo,
  ...adminLegal,
  ...teamStatus,
  ...clientRelation,
  ...companyOwner,
  ...mainContact,
};

export const filtersDefaultValues: CompanyListFilters = {
  countryId: null,
  companyOwnerId: null,
  relationStatusId: null,
  onboardingStatusId: null,
  optiPixContractStatusId: null,
  parentEntityName: '',
  search: '',
};

export const CONTRACT_STATUS = {
  NO_CONTRACT: 'NO_CONTRACT',
  SENT: 'SENT',
  SIGNED: 'SIGNED',
  REFUSED: 'REFUSED',
  CANCELLED: 'CANCELLED',
} as const;

export const PHOTOBOX_STATUS = {
  NOT_READY: 'NOT_READY',
  READY: 'READY',
} as const;

export const COMPANY_TYPE = {
  DEALER_GROUP: 'DEALER_GROUP',
  DEALERSHIP: 'DEALERSHIP',
  OEM: 'OEM',
  SUBSIDIARY: 'SUBSIDIARY',
} as const;

export const COMPANIES_DATA_VIEW_ID = 'companies_list';

export const CONTRACT_ACTIONS = {
  sign: 'sign',
  refuse: 'refuse',
} as const;

export const PAGE_MESSAGES_NO_BACKGROUNDS = {
  messageLine1: 'companies.marketingNoBackgrounds.message1',
  messageLine2: 'companies.marketingNoBackgrounds.message2',
} as const;

export const PAGE_MESSAGES_NO_LICENSE_PLATE = {
  messageLine1: 'companies.marketingNoLicensePlates.message1',
  messageLine2: 'companies.marketingNoLicensePlates.message2',
} as const;

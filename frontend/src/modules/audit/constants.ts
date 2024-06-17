export const QUESTIONNAIRE_TYPE = {
  OPTI_PIX: 'OPTI_PIX',
  OPTI_ADS: 'OPTI_ADS',
  // OPTI_LEADS: 'OPTI_LEADS',
} as const;

export const QUESTIONNAIRE_PHASE = {
  PRE_AUDIT: 'PRE_AUDIT',
  AUDIT: 'AUDIT',
} as const;

export const AUDIT_STATUS = {
  NOT_OPEN: 'NOT_OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  SENT: 'SENT',
} as const;

export const auditListFiltersDefaultValues = {
  search: '',
  commercialIds: [],
  types: [],
  dealerIds: [],
  parentEntityIds: [],
  statuses: [],
  companyCountryIds: null,
  rating: {from: null, to: null}
};

export const AUDIT_PAGE_ADMIN_DATA_VIEW_ID = 'audit_page_admin';

export const AUDIT_LIST_USER_DATA_VIEW_ID = 'audit_list_user';

export const RATINGS = {
  '0.0': 0,
  '0.5': 0.5,
  '1.0': 1,
  '1.5': 1.5,
  '2.0': 2,
  '2.5': 2.5,
  '3.0': 3,
  '3.5': 3.5,
  '4.0': 4,
  '4.5': 4.5,
  '5.0': 5,
} as const;

export type RatingKey = keyof typeof RATINGS;

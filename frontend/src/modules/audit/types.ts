import { UseFormReturn } from '@/components/shared';
import type { Company } from '@/modules/companies';
import type { UploadFile } from '@/types/file';
import type { OptionType } from '@/types/form';

import {
  AUDIT_STATUS,
  QUESTIONNAIRE_PHASE,
  QUESTIONNAIRE_TYPE,
} from './constants';

export type AuditStatus = keyof typeof AUDIT_STATUS;

export type AuditRatingFilter = {
  from: number | null;
  to: number | null;
};

export type OverviewUser = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
};

export type StatusExtended = {
  id: string;
  responsibleUser: OverviewUser;
  rating: AuditRating;
  status: AuditStatus;
  hasHistory: boolean;
};

export type Audit = {
  companyId: number;
  companyName: string; //concession
  companyNickname: string;
  companyCountryName: string;
  parentEntity: string; //group
  officialCarDealer: string[];
  commercialUser: OverviewUser;
  commercialAssistantUser: OverviewUser;
  preAuditOptiPix: StatusExtended;
  preAuditOptiAds: StatusExtended;
  preAuditOptiLeads: StatusExtended;
};

export type AuditForUser = {
  auditType: AuditQuestionnaireType;
  rating: number;
  createdBy: string;
  dateCreated: string;
  relatedReport: string;
  companyName: string;
  companyNickname: string;
  companyId: number;
  companyCountryName: string;
  hasHistory: boolean;
};

export type Stars = {
  score: number;
  max: number;
};

export type AuditRating = {
  private: Stars;
  stars: Stars;
};

export type AuditDetail = {
  responsibleUser: {
    firstName: string;
    lastName: string;
  };
  rating: AuditRating;
  date: string;
  lastModified: string;
  company: Company;
  phase: AuditQuestionnairePhase;
  state: AuditStatus;
  type: AuditQuestionnaireType;
  answers: QuestionnaireQueryAnswer[];
  lastModifiedByUser?: {
    firstName?: string;
    lastName?: string;
  };
};

export type Group = {
  groupHeader: string;
  groupHeaderLocalizationKey: string;
  nationalAverageRating: null | any; //TODO waiting for api
  rating: {
    stars: Stars;
  };
};

export type QuestionnaireAnswerImage = {
  name: string;
  uri: string;
  thumbnailUri: string;
};

export type QuestionAnswer = {
  code: string;
  questionText: string;
  questionTextLocalizationKey: string;
  images: QuestionnaireAnswerImage[];
};

export type ReportDetail = {
  companyName: string;
  groups: Group[];
  contactBusinessCard: any[]; //TODO waiting for api
  lastModified: string;
  questionnaireId: string;
  questionnairePhase: string;
  questionnaireType: string;
  rating: {
    stars: Stars;
  };
  questionAnswers: QuestionAnswer[];
};

export type AuditDetailParams = {
  id: string;
};

export type AuditQuestionnairePhase = keyof typeof QUESTIONNAIRE_PHASE;

export type AuditQuestionnaireType = keyof typeof QUESTIONNAIRE_TYPE;

export type ValueTypeName =
  | 'YesNoOption'
  | 'TextValue'
  | 'SingleSelectOption'
  | 'MultiSelectOption'
  | 'NumberValue'
  | 'DateTimeValue'
  | 'DropDownOption'
  | 'EmptyValue';

export type OptionConfig = {
  id: string;
  label: string;
  labelLocalizationKey: string;
  isBonus: boolean;
  popupDescription: string;
  popupDescriptionLocalizationKey: string;
  evaluation: number;
};

export type ValueTypeConfig = {
  __typename: ValueTypeName;
  id: string;
  pointsForTrue: boolean;
  evaluation: number;
  options: OptionConfig[];
};

export type QuestionValidationRules =
  | 'AnswerRequired'
  | 'AttachmentRequired'
  | 'CanAttachFile';

export type AuditQuestion = {
  id: string;
  text: string;
  textLocalizationKey: string;
  validationRules: QuestionValidationRules[];
  valueType: ValueTypeConfig;
  popupDescription: string;
  popupDescriptionLocalizationKey: string;
  attachmentsCombination: AttachmentsCombinationType;
};

export type AuditQuestionnaireTemplateGroup = {
  header: string;
  headerLocalizationKey: string;
  questions: AuditQuestion[];
};

export type AuditQuestionnaireTemplate = {
  isActive: boolean;
  templateType: AuditQuestionnaireType;
  phase: AuditQuestionnairePhase;
  groups: AuditQuestionnaireTemplateGroup[];
};

export type AnswerValue = any;

export type Answer = {
  questionId: string;
  value: AnswerValue;
  valueType: ValueTypeName;
  note: string;
};

export type AuditQuestionnaireFormValue = {
  value: AnswerValue;
  note: string;
  attachments: UploadFile[];
};

export type AuditQuestionnaireValues = Record<
  string,
  AuditQuestionnaireFormValue
>;

export type QuestionnaireQueryAnswer = {
  questionId: string;
  attachments: UploadFile[];
  value: AnswerValue;
  note: string;
};

export type AuditListForm = {
  search: string;
  dealerIds: OptionType<number>[];
  parentEntityIds: string[];
  rating?: AuditRatingFilter;
  commercialIds: number[];
  statuses: AuditStatus[];
  types: AuditQuestionnaireType[];
  companyCountryIds: number | null;
};

export type AuditListFiltersType = {
  search: string;
  dealerIds: number[];
  companyCountryIds: number | null;
  parentEntityIds: string[];
  rating?: AuditRatingFilter;
  commercialIds: number[];
  statuses: AuditStatus[];
  types: AuditQuestionnaireType[];
};

export type ActiveTemplates = {
  id: string;
  name: string;
  nameLocalizationKey: string;
  isActive: boolean;
  isEditable: boolean;
  phase: AuditQuestionnairePhase;
  templateType: AuditQuestionnaireType;
};

export type FormMethods = UseFormReturn<AuditQuestionnaireValues, any>;

export const ATTACHMENT_TYPE = {
  PREVIEW: 'PREVIEW',
  SCREENSHOT: 'SCREENSHOT',
  UNKNOWN: 'UNKNOWN',
} as const;

export type AttachmentType = keyof typeof ATTACHMENT_TYPE;

export const ATTACHMENTS_COMBINATION = {
  ONLY_PREVIEWS: 'ONLY_PREVIEWS',
  ONLY_SCREENSHOT: 'ONLY_SCREENSHOT',
  ALTERNATING: 'ALTERNATING',
  ANY: 'ANY',
} as const;

export type AttachmentsCombinationType = keyof typeof ATTACHMENTS_COMBINATION;

export type ReorderAttachment = {
  id: string;
  attachmentType: AttachmentType;
};

export type UploadAttachment = {
  data: File;
  attachmentType: AttachmentType;
};

export type AuditHistoryModalInput = {
  auditType: AuditQuestionnaireType;
  companyId: number;
  dealerName: string;
};

export type AuditHistoryRow = {
  questionnaireId: string;
  dateCreated: string;
  dateSent: string;
  createdByUser: {
    firstname: string;
    lastname: string;
  };
  sentByUser: {
    firstname: string;
    lastname: string;
  };
  rating: {
    stars: Stars;
  };
  status: AuditStatus;
};

import { TFunction } from 'i18next';
import { useParams } from 'react-router-dom';

import { Separator } from '@/components/elements';
import { TabElement } from '@/components/shared/Tabs';
import { CompanyDetailParams } from '@/modules/companies';

import { CompanyBackgrounds } from '../components/CompanyBackgrounds';
import { CompanyLicensePlates } from '../components/CompanyLicensePlates';

import {
  FieldsAdminLegal,
  FieldsClientRelation,
  FieldsCompany,
  FieldsCompanyOwner,
  FieldsMainContact,
  FieldsTeamStatus,
} from './FieldsGroups';

const tabContentStyles = 'grid-col grid gap-4 pt-3';

// "t" function return type is "DefaultTFuncReturn" that can be null
const getTranslation = (t: TFunction, key: string): string => t(key) as string;

const renderTab = (tab: TabElement, isShown: boolean = true): TabElement[] =>
  isShown ? [tab] : [];

export const GetCompanyDetailTabs = (
  t: TFunction,
  canViewMarketingTab?: boolean,
  canEditCompany?: boolean,
): TabElement[] => {
  const { id = '0' } = useParams<CompanyDetailParams>();

  const generalLegalTab = {
    title: t('companies.generalLegal'),
    content: (
      <div className={tabContentStyles}>
        <Separator text={getTranslation(t, 'common.company')} />
        <FieldsCompany canEditCompany={canEditCompany} mode="edit" />

        <Separator
          className="mt-7"
          text={getTranslation(t, 'companies.adminLegal')}
        />
        <FieldsAdminLegal canEditCompany={canEditCompany} mode="edit" />
      </div>
    ),
  };

  const teamClientTab = {
    title: t('companies.teamClient'),
    content: (
      <div className={tabContentStyles}>
        <Separator text={getTranslation(t, 'companies.teamStatus')} />
        <FieldsTeamStatus mode="edit" />

        <Separator
          className="mt-7"
          text={getTranslation(t, 'companies.clientRelation')}
        />
        <FieldsClientRelation mode="edit" />
      </div>
    ),
  };

  const contactsTab = {
    title: t('common.contacts'),
    content: (
      <div className={tabContentStyles}>
        <Separator text={getTranslation(t, 'common.companyOwner')} />
        <FieldsCompanyOwner canEditCompany={canEditCompany} mode="edit" />

        <Separator
          className="mt-7"
          text={getTranslation(t, 'common.mainContact')}
        />
        <FieldsMainContact mode="edit" />
      </div>
    ),
  };

  const marketingTab = {
    title: t('companies.marketing'),
    content: (
      <div className={tabContentStyles}>
        <Separator
          text={getTranslation(t, 'companies.marketingBackgrounds.title')}
        />
        <CompanyBackgrounds companyId={parseInt(id)} />
        <Separator
          className="mt-7"
          text={getTranslation(t, 'companies.marketingLicense.title')}
        />
        <CompanyLicensePlates companyId={parseInt(id)} />
      </div>
    ),
  };

  return [
    ...renderTab(generalLegalTab),
    ...renderTab(teamClientTab, canEditCompany),
    ...renderTab(contactsTab),
    ...renderTab(marketingTab, canViewMarketingTab),
  ];
};

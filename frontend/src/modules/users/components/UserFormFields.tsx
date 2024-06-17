import { FC, useState } from 'react';

import { Heading, IconButton, Tooltip } from '@/components/elements';
import { useFormContext } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { Contact, CreateUserFormValues } from '../types';

import { ContactList } from './ContactList';
import { ContactListItem } from './ContactListItem';
import { PersonalInfo } from './PersonalInfo';
import { TenantAssignment } from './TenantAssignment';

type Props = {
  tenantId?: string;
  withTenantRoles?: boolean;
  isAddUser?: boolean;
};

export const userFormDefaultValues: Partial<CreateUserFormValues> = {
  firstname: '',
  lastname: '',
  gender: '',
  phoneNumber: '',
  mobileNumber: '',
  email: '',
  defaultLanguageId: '',
  tenantAssignments: [{ tenantId: '', roleAssignments: [] }],
};

export const CREATE_USER_FORM_ID = 'createUserForm';
export const CUSTOM_CONTACT_ID = '_custom';

export const UserFormFields: FC<Props> = ({
  tenantId,
  withTenantRoles,
  isAddUser,
}) => {
  const { t } = useTranslation();
  const [activeContactId, setActiveContactId] =
    useState<string>(CUSTOM_CONTACT_ID);
  const { reset } = useFormContext();

  const customContact: Contact = {
    id: CUSTOM_CONTACT_ID,
    firstname: t('users.newUser'),
    lastname: '',
    avatar: '/images/users_placeholder.svg',
    email: '',
    gender: '',
    tenantAssignments: [],
    phoneNumber: '',
    mobileNumber: '',
    defaultLanguageId: '',
  };

  return (
    <div className="flex flex-wrap-reverse gap-x-16">
      <div>
        <ContactListItem
          activeContactId={activeContactId}
          contact={customContact}
          setActiveContactId={setActiveContactId}
          onClick={() => reset(userFormDefaultValues)}
        />
        <div className="mb-2 mt-4 flex items-center">
          <Heading variant="h4">{t('users.hubspotContacts')}</Heading>
          <Tooltip
            content={t('users.hubspotContactsTooltip')}
            placement="top-end"
          >
            <IconButton
              className="text-gray-400"
              name="question"
              size="sm"
              variant="ghost"
            />
          </Tooltip>
        </div>
        <div className="max-h-[400px] w-[236px] overflow-y-auto">
          <ContactList
            activeContactId={activeContactId}
            isAddUser={isAddUser}
            setActiveContactId={setActiveContactId}
          />
        </div>
      </div>
      <div className="mb-4">
        <PersonalInfo />
        <TenantAssignment
          tenantId={tenantId}
          withTenantRoles={withTenantRoles}
        />
      </div>
    </div>
  );
};

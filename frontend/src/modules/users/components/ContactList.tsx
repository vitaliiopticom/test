import React from 'react';

import { Skeleton } from '@/components/elements';
import { QueryDataLoader, useFormContext } from '@/components/shared';
import { PERMISSIONS, usePermissions } from '@/modules/auth';

import { useGetContactsForTenantQuery } from '../api/getContactsForTenant';
import { CreateUserFormValues } from '../types';
import { transformContactsDataToFormValues } from '../utils';

import { ContactListItem } from './ContactListItem';
import { UserFormChangeHelper } from './UserFormChangeHelper';

type Props = {
  activeContactId?: string;
  setActiveContactId: (contactId: string) => void;
  isAddUser?: boolean;
};

export const ContactList: React.FC<Props> = ({
  activeContactId,
  setActiveContactId,
  isAddUser,
}) => {
  const { watch } = useFormContext<CreateUserFormValues>();
  const viewAllTenants = usePermissions(PERMISSIONS.Users_View_AllTenants);

  const tenantAssignments = watch('tenantAssignments');
  const { tenantId } = tenantAssignments[0] || {};

  const variables =
    viewAllTenants && tenantId && isAddUser
      ? { input: { tenantId } }
      : undefined;

  const companyContactsQuery = useGetContactsForTenantQuery({
    variables,
    skip: isAddUser && !tenantId && viewAllTenants,
  });

  const contacts = transformContactsDataToFormValues(
    companyContactsQuery.data?.contactsForTenant,
  );

  return (
    <ul className="flex list-none flex-col gap-1">
      <QueryDataLoader
        loader={
          <>
            <Skeleton className="h-[50px]" />
            <Skeleton className="h-[50px]" />
            <Skeleton className="h-[50px]" />
          </>
        }
        query={companyContactsQuery}
      >
        {contacts.map((contact) => (
          <ContactListItem
            key={contact.email}
            activeContactId={activeContactId}
            contact={contact}
            setActiveContactId={setActiveContactId}
          />
        ))}
      </QueryDataLoader>
      <UserFormChangeHelper
        activeContactId={activeContactId}
        contacts={contacts}
        setActiveContactId={setActiveContactId}
      />
    </ul>
  );
};

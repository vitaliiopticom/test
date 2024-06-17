import React, { useEffect } from 'react';

import { useFormContext } from '@/components/shared';

import { Contact, CreateUserFormValues } from '../types';

import { CUSTOM_CONTACT_ID, userFormDefaultValues } from './UserFormFields';

type Props = {
  contacts: Contact[];
  setActiveContactId: (contactId: string) => void;
  activeContactId?: string;
};

export const UserFormChangeHelper: React.FC<Props> = ({
  activeContactId,
  contacts,
  setActiveContactId,
}) => {
  const {
    reset,
    formState: { isDirty },
  } = useFormContext<CreateUserFormValues>();

  useEffect(() => {
    if (isDirty) {
      setActiveContactId(CUSTOM_CONTACT_ID);
    }
    // eslint-disable-next-line
  }, [isDirty]);

  useEffect(() => {
    const activeContact = contacts.find(
      (contact) => contact.id === activeContactId,
    );

    if (activeContactId !== CUSTOM_CONTACT_ID && activeContact) {
      reset(({ tenantAssignments }) => ({
        ...userFormDefaultValues,
        ...activeContact,
        tenantAssignments,
      }));
    }
    // eslint-disable-next-line
  }, [activeContactId]);

  return null;
};

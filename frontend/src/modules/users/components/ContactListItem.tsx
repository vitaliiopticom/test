import React from 'react';

import { Avatar, Icon, Text } from '@/components/elements';
import { cx } from '@/utils/classNames';

import { Contact } from '../types';
import { createFullNameFromUser } from '../utils';

import { CUSTOM_CONTACT_ID } from './UserFormFields';

type Props = {
  contact: Contact;
  activeContactId?: string;
  setActiveContactId: (contactId: string) => void;
  onClick?: () => void;
};

export const ContactListItem: React.FC<Props> = ({
  contact,
  activeContactId,
  setActiveContactId,
  onClick,
}) => {
  const fullName = createFullNameFromUser(contact.firstname, contact.lastname);

  const isSelected = activeContactId === contact.id;

  return (
    <li className="w-full list-none pr-2">
      <button
        className={cx(
          'm-1 flex h-[50px] w-full flex-row items-center gap-4 rounded-e-md border-l-4 border-l-transparent pl-4 pr-2 hover:bg-primary-tint-90 focus:border-l-primary-tint-10 focus:outline-2 focus:outline-primary-tint-10',
          activeContactId === contact.id &&
            'border-l-primary-tint-10 bg-primary-tint-90',
        )}
        type="button"
        onClick={() => {
          setActiveContactId(contact.id);
          onClick?.();
        }}
      >
        {contact.id === CUSTOM_CONTACT_ID ? (
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-primary-tint-70">
            <Icon color="white" name="users" />
          </div>
        ) : (
          <Avatar
            alt={fullName}
            imgUrl={contact.avatar}
            name={fullName}
            size="md"
          />
        )}
        <Text
          className={cx('truncate text-secondary')}
          variant={isSelected ? 'bold' : 'medium'}
        >
          {fullName}
        </Text>
      </button>
    </li>
  );
};

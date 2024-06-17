import { FC } from 'react';

import { Icon, Link, Modal, Text } from '@/components/elements';
import { ContactData } from '@/components/shared/ContactModal/types';
import { ModalProps } from '@/types/modal';

type SectionProps = {
  label: string;
  icon: 'phone' | 'envelope';
  labelPrefix?: string;
  value?: string;
};
const Section: FC<SectionProps> = ({ label, icon, value, labelPrefix }) => {
  if (!value) {
    return null;
  }

  const linkPrefix = icon === 'phone' ? 'tel' : 'mailto';

  return (
    <>
      <div className="flex items-center gap-3 text-[1rem] font-semibold text-secondary">
        <div className="rounded-md border border-gray-30 bg-gray-30 p-2 text-3xl">
          <Icon name={icon} />
        </div>
        {labelPrefix && <Text>{labelPrefix}</Text>}
        <Link to={`${linkPrefix}:${value}`} isExternal>
          {label}
        </Link>
      </div>
    </>
  );
};

export const ContactModal: FC<ModalProps<ContactData>> = ({
  isOpen,
  data,
  onClose,
  className,
}) => {
  const { title, description, sections } = data ?? {};

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      title={title}
      onClose={onClose}
    >
      <div className="flex flex-col gap-5">
        {description && <Text>{description}</Text>}
        {sections?.map((props, index) => {
          return <Section {...props} key={index} />;
        })}
      </div>
    </Modal>
  );
};

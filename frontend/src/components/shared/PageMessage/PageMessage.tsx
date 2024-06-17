import { FC, ReactElement } from 'react';

import { Heading, Image, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

export type PageMessageType = {
  header?: string;
  messageLine1?: string;
  messageLine2?: string;
};

export const MessageVariant = {
  INFO: 'INFO',
  ERROR: 'ERROR',
} as const;

type Props = {
  messages: PageMessageType;
  variant?: keyof typeof MessageVariant;
  children?: ReactElement;
};

export const PageMessage: FC<Props> = ({
  messages: { header, messageLine1, messageLine2 },
  variant = MessageVariant.INFO,
  children,
}) => {
  const { t } = useTranslation();
  const variantImage =
    variant === MessageVariant.INFO
      ? '/images/photobox-message.svg'
      : '/images/error.svg';

  return (
    <div className="flex flex-col items-center justify-center">
      <Image alt="photobox" src={variantImage} />
      {header && <Heading className="mb-4 mt-8">{t(header)}</Heading>}
      <Text
        className={cx('text-center', (messageLine1 || messageLine2) && 'mt-6')}
        size="lg"
      >
        {messageLine1 && t(messageLine1)}
        <br />
        {messageLine2 && t(messageLine2)}
      </Text>
      {children}
    </div>
  );
};

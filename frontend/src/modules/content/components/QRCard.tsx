import { FC } from 'react';

import { Heading, Image } from '@/components/elements';
import { cx } from '@/utils/classNames';

type Props = {
  header: string;
  imgSrc?: string;
  className?: string;
};

export const QRCard: FC<Props> = ({ header, imgSrc, className }) => {
  return (
    <div
      className={cx(
        'flex flex-col items-center rounded-lg border border-secondary-tint-90 px-12 py-3',
        className,
      )}
    >
      <Heading variant="h3">{header}</Heading>
      <Image alt="login" className="h-48 w-48 object-cover" src={imgSrc} />
    </div>
  );
};

import React, { FC } from 'react';

import { Image, Text } from '@/components/elements';
import { PageMessage, PageMessageType } from '@/components/shared';

export type CompanyImage = {
  name: string;
  path: string;
  thumbnailPath: string;
};

type Props = {
  images: CompanyImage[];
  pageMessage: PageMessageType;
};

export const CompanyImages: FC<Props> = ({ images, pageMessage }) => {
  if (images.length === 0) {
    return <PageMessage messages={pageMessage} />;
  }

  return (
    <div className="flex flex-row gap-6">
      {images.map(({ path, name }) => {
        return (
          <div>
            <Image alt="image" className="mb-1" src={path} width="200" />
            <Text as="p">{name}</Text>
          </div>
        );
      })}
    </div>
  );
};

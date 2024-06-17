import { FC } from 'react';

import { Heading, IconButton, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';

import { ContentItemType } from '../../../types';

const contentItemTypes: Record<ContentItemType, string> = {
  EXTERIOR: 'content.exterior',
  INTERIOR: 'content.interior',
  DETAILS: 'content.details',
  VIDEO: 'content.video',
} as const;

type Props = {
  position: number;
  photosEditable: boolean;
  contentType?: ContentItemType;
};

export const GalleryContentDetails: FC<Props> = ({
  contentType,
  photosEditable,
  position,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-5">
      <div className="min-w-52 mt-8 flex w-52 items-center justify-between">
        <Heading className="text-white" variant="h2">
          {`${t('content.position')} ${position}`}
        </Heading>
        {photosEditable && (
          <IconButton
            iconClassName="text-primary"
            name="editPencil"
            variant="ghost"
          />
        )}
      </div>
      <Text className="text-white">
        {contentType && t(contentItemTypes[contentType])}
      </Text>
    </div>
  );
};

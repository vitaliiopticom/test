import { FC } from 'react';

import { Image, VideoPlayer } from '@/components/elements';

import { FALLBACK_IMAGE } from '../../../constants';
import { GalleryItem } from '../../../types';

import { GalleryContentDetails } from './GalleryContentDetails';

type Props = {
  contentItem: GalleryItem;
  isVideoContent: boolean;
  photosEditable: boolean;
};

export const GalleryContent: FC<Props> = ({
  contentItem,
  photosEditable,
  isVideoContent,
}) => {
  const { id, image, video, position, contentType } = contentItem;

  return (
    <div className="flex items-center justify-center">
      <div className="w-2/3">
        <GalleryContentDetails
          contentType={contentType}
          photosEditable={photosEditable}
          position={position}
        />
        {isVideoContent ? (
          <VideoPlayer
            fallbackMessage={<>No video</>}
            sources={[{ src: video?.uri || '', type: video?.contentType }]}
            controls
          />
        ) : (
          <Image
            alt={`Car with id ${id}`}
            className="rounded-lg object-cover"
            fallbackPath={FALLBACK_IMAGE}
            src={image?.uri || FALLBACK_IMAGE}
          />
        )}
      </div>
    </div>
  );
};

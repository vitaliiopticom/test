import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CONTENT_ITEM_TYPE } from '../constants';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { GalleryItem, VehicleDetails } from '../types';

import { GalleryModal } from './GalleryModal';
import { VehicleDetail } from './VehicleDetail';

type Props = {
  vehicleDetail: VehicleDetails;
  vehicleId: string;
};

export const VehicleDetailContentManager: FC<Props> = ({
  vehicleDetail,
  vehicleId,
}) => {
  const [searchParams] = useSearchParams();
  const { images, videos } = vehicleDetail;

  const contentItems: GalleryItem[] = useMemo(() => {
    const imagesItems = images.map(({ photoType, ...rest }) => ({
      contentType: photoType,
      ...rest,
    }));
    const videosItems = videos.map((video) => ({
      contentType: CONTENT_ITEM_TYPE.VIDEO,
      ...video,
    }));

    return [...imagesItems, ...videosItems]
      .sort((a, b) => a.position - b.position)
      .map((item, index) => ({
        internalPosition: index,
        ...item,
      }));
  }, [images, videos]);

  const initialContentItemId = searchParams.get('contentItemId');
  const initialContentItem = contentItems.find(
    (contentItem) => contentItem.id === initialContentItemId,
  );

  const { galleryItem, setGalleryItem, handleNext, handlePrev } =
    usePhotoGallery(initialContentItem, contentItems);

  const handleOnOpenModal = (pos: number) => setGalleryItem(contentItems[pos]);

  return (
    <>
      <VehicleDetail
        contentItems={contentItems}
        vehicleDetail={vehicleDetail}
        onOpenModal={handleOnOpenModal}
      />
      <GalleryModal
        contentItem={galleryItem}
        handleNext={handleNext}
        handlePrev={handlePrev}
        isOpen={!!galleryItem}
        vehicleId={vehicleId}
        onClose={() => setGalleryItem(undefined)}
      />
    </>
  );
};

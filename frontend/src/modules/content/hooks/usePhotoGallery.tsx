import { useState } from 'react';

import { GalleryItem } from '../types';

export const usePhotoGallery = (
  initialState: GalleryItem | undefined,
  items: GalleryItem[],
) => {
  const [galleryItem, setGalleryItem] = useState<GalleryItem | undefined>(
    initialState,
  );

  const handleItemChange = (items: GalleryItem[], newItemIdx: number) => {
    if (newItemIdx >= items.length) {
      setGalleryItem({ ...items[0], internalPosition: 0 });

      return;
    }

    if (newItemIdx < 0) {
      const lastIdx = items.length - 1;

      setGalleryItem({ ...items[lastIdx], internalPosition: lastIdx });

      return;
    }

    setGalleryItem({ ...items[newItemIdx], internalPosition: newItemIdx });
  };

  const handleNext = () => {
    if (!galleryItem) {
      return;
    }

    const idx = galleryItem.internalPosition + 1;

    handleItemChange(items, idx);
  };

  const handlePrev = () => {
    if (!galleryItem) {
      return;
    }

    const idx = galleryItem.internalPosition - 1;

    handleItemChange(items, idx);
  };

  return { galleryItem, setGalleryItem, handleNext, handlePrev };
};

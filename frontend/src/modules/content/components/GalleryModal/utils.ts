import { GalleryItem } from '../../types';

export const getContentItemRef = (
  { video, image, ...rest }: GalleryItem,
  isVideoContent: boolean,
) =>
  isVideoContent ? { content: video, ...rest } : { content: image, ...rest };

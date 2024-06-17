import React from 'react';

import { Button, Heading } from '@/components/elements';
import { FetchFile } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { FILES_EVIDENCE_STATE } from '../constants';
import { FileEvidenceState, GalleryItem, VehicleDetails } from '../types';
import { getFilesEvidenceState, getVideosDowloadUris } from '../utils';

import { PhotosList } from './PhotosList';

type DetailHeaderTranslationValue = {
  photosCount?: number;
  videosCount?: number;
};

type DetailHeaderTranslation = {
  key: string;
  value: DetailHeaderTranslationValue;
};

const detailHeaderTranslations: Record<
  FileEvidenceState,
  (value: DetailHeaderTranslationValue) => DetailHeaderTranslation
> = {
  [FILES_EVIDENCE_STATE.onlyPhotos]: (value: DetailHeaderTranslationValue) => ({
    key: 'content.photosCount',
    value: { photosCount: value.photosCount },
  }),
  [FILES_EVIDENCE_STATE.onlyVideos]: (value: DetailHeaderTranslationValue) => ({
    key: 'content.videosCount',
    value: { videosCount: value.videosCount },
  }),
  [FILES_EVIDENCE_STATE.all]: (value: DetailHeaderTranslationValue) => ({
    key: 'content.photosAndVideosCount',
    value,
  }),
};

type Props = {
  vehicleDetail: VehicleDetails;
  contentItems: GalleryItem[];
  onOpenModal: (pos: number) => void;
};

export const VehicleDetail: React.FC<Props> = ({
  vehicleDetail,
  contentItems,
  onOpenModal,
}) => {
  const { t } = useTranslation();

  const { coverImage, vehicle, videosCount, images, videos } = vehicleDetail;
  const { processedImagesArchiveUri, allImagesArchiveUri } = vehicle;
  const photosCount = images?.length;

  const videosUris = getVideosDowloadUris(videos);
  const filesEvidenceState = getFilesEvidenceState(photosCount, videosCount);
  const { key, value } = detailHeaderTranslations[filesEvidenceState]({
    photosCount,
    videosCount,
  });
  const contentDetailHeaderTranslation = t(key, value);

  const photosAvailable =
    filesEvidenceState !== FILES_EVIDENCE_STATE.onlyVideos;
  const videosAvailable =
    filesEvidenceState !== FILES_EVIDENCE_STATE.onlyPhotos;

  return (
    <>
      <div className="mb-8 flex flex-wrap">
        <Heading className="mb-2" variant="h3">
          {contentDetailHeaderTranslation}
        </Heading>

        <div className="flex flex-grow flex-wrap justify-end gap-4">
          {videosAvailable && (
            <FetchFile>
              {(args) => (
                <Button
                  className="whitespace-nowrap"
                  disabled={!videosUris.length}
                  isLoading={args.state.isLoading}
                  variant="secondary"
                  onClick={() => args.saveMultipleFiles(videosUris)}
                >
                  {t('content.downloadAllVideos')}
                </Button>
              )}
            </FetchFile>
          )}
          {photosAvailable && (
            <>
              <FetchFile>
                {(args) => (
                  <Button
                    className="whitespace-nowrap"
                    disabled={
                      !contentItems.length || !processedImagesArchiveUri
                    }
                    isLoading={args.state.isLoading}
                    variant="secondary"
                    onClick={() => args.saveFile(processedImagesArchiveUri)}
                  >
                    {t('content.DownloadProcessedPhotos')}
                  </Button>
                )}
              </FetchFile>
              <FetchFile>
                {(args) => (
                  <Button
                    className="whitespace-nowrap"
                    disabled={!contentItems.length || !allImagesArchiveUri}
                    isLoading={args.state.isLoading}
                    onClick={() => args.saveFile(allImagesArchiveUri)}
                  >
                    {t('content.downloadAllPhotos')}
                  </Button>
                )}
              </FetchFile>
            </>
          )}
        </div>
      </div>
      <PhotosList
        contentItems={contentItems}
        coverImage={coverImage}
        onOpenModal={onOpenModal}
      />
    </>
  );
};

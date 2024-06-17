import { FC } from 'react';

import { Button, Text } from '@/components/elements';
import { DataView, FetchFile } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { sum } from '@/utils/array';
import { bytesToMb } from '@/utils/file';

import { Vehicle } from '../types';

type Props = {
  setItemsDownloading: (value: boolean) => void;
};

export const SelectedVehiclesActionsPopup: FC<Props> = ({
  setItemsDownloading,
}) => {
  const { t } = useTranslation();

  return (
    <DataView.SelectionActionsPopup<Vehicle>>
      {({ selectedItems, resetSelection }) => {
        const totalArchivesSize = sum(
          selectedItems,
          (item) => item.processedImagesArchiveSize,
        );
        const archivesUrls = selectedItems?.map(
          (item) => item?.processedImagesArchiveUri,
        );

        return (
          <div className="flex w-full items-center justify-between">
            <Text>
              {`${t('common.fileSize')}: `}
              <span className="font-semibold">
                {bytesToMb(totalArchivesSize)}
              </span>
            </Text>
            <FetchFile>
              {({ saveMultipleFiles, state }) => (
                <Button
                  isLoading={state.isLoading}
                  onClick={() => {
                    setItemsDownloading(true);
                    saveMultipleFiles(
                      archivesUrls,
                      () => {
                        setItemsDownloading(false);
                        resetSelection();
                      },
                      () => setItemsDownloading(false),
                    );
                  }}
                >
                  {t('content.downloadImprovedPhotos')}
                </Button>
              )}
            </FetchFile>
          </div>
        );
      }}
    </DataView.SelectionActionsPopup>
  );
};

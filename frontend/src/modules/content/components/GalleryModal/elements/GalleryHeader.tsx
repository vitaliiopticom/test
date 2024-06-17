import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/elements';
import { FetchFile } from '@/components/shared';
import { useCopyToClipboard } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';

import { GalleryItem } from '../../../types';

type Props = {
  contentItem: GalleryItem;
  isVideoContent: boolean;
  onClose: () => void;
  onItemDelete: ({ input }: { input: string[] }) => void;
};

export const GalleryHeader: FC<Props> = ({
  contentItem,
  isVideoContent,
  onClose,
  onItemDelete,
}) => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { copy } = useCopyToClipboard();
  const canViewChildTenants = usePermissions(
    PERMISSIONS.OptiContent_View_ChildTenants,
  );
  const canViewAllTenants = usePermissions(
    PERMISSIONS.OptiContent_View_AllTenants,
  );

  const { id, originalImage, image, video } = contentItem;

  const handleShareLink = () => {
    setSearchParams({ contentItemId: id });

    const url = window.location.href;

    copy(url);
  };

  const downloadUrl = isVideoContent ? video?.uri : image?.uri;
  const downloadName = isVideoContent ? video?.name : image?.name;

  return (
    <div className="flex">
      <Button startIcon="arrowBackTo" variant="ghost" onClick={onClose}>
        {t('common.back')}
      </Button>
      <div className="ml-auto flex gap-4">
        {!canViewChildTenants && !canViewAllTenants && (
          <Button
            variant="secondary"
            onClick={() => onItemDelete({ input: [id] })}
          >
            {t('common.delete')}
          </Button>
        )}
        <Button variant="secondary" onClick={handleShareLink}>
          {t('common.share')}
        </Button>
        {!isVideoContent && (
          <FetchFile>
            {(args) => (
              <Button
                isLoading={args.state.isLoading}
                variant="secondary"
                onClick={() =>
                  args.saveFile(originalImage?.uri, originalImage?.name)
                }
              >
                {t('content.downloadOriginal2')}
              </Button>
            )}
          </FetchFile>
        )}
        <FetchFile>
          {(args) => (
            <Button
              isLoading={args.state.isLoading}
              onClick={() => args.saveFile(downloadUrl, downloadName)}
            >
              {t('content.download')}
            </Button>
          )}
        </FetchFile>
      </div>
    </div>
  );
};

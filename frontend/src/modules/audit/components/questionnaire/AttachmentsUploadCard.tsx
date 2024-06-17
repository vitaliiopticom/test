import { FC } from 'react';

import { Chip, Icon, IconButton, Image, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { UploadFile } from '@/types/file';
import { cx } from '@/utils/classNames';
import { formatDate } from '@/utils/date';

import { ATTACHMENT_TYPE, AttachmentsCombinationType } from '../../types';
import { getAttachmentType } from '../../utils';

type Props = {
  item: UploadFile;
  index: number;
  isLoading: boolean;
  handleRemoveAttachments: (item: UploadFile) => void;
  isDisabled?: boolean;
  attachmentsCombination: AttachmentsCombinationType;
};

export const AttachmentsUploadCard: FC<Props> = ({
  item,
  index,
  isDisabled,
  isLoading,
  handleRemoveAttachments,
  attachmentsCombination,
}) => {
  const { t } = useTranslation();

  return (
    <div
      key={item.uri}
      className={cx(
        'border-5 relative flex h-full max-h-[190px] min-w-[250px] flex-row items-center overflow-hidden rounded bg-gray-20',
        isDisabled ? 'cursor-not-allowed' : 'cursor-grab',
      )}
    >
      <Icon className={'mx-4 text-secondary-tint-60'} name="drag" size={28} />
      <a
        className={cx(
          'flex flex-col items-center',
          !item.thumbnailUri && 'h-[190px]',
        )}
        href={item.uri || '#'}
        rel="noreferrer"
        target="_blank"
      >
        {item.thumbnailUri ? (
          <Image
            alt={item.name}
            className="my-2 max-h-[100px] rounded-lg"
            fallbackPath="/images/thumbnail-fallback.svg"
            src={item.thumbnailUri}
          />
        ) : (
          <>
            <Icon className="mb-2 mt-8 h-14 w-14 text-primary" name="file" />
            <Text
              className="mb-4 max-w-[10ch] truncate"
              size="lg"
              title={item.name}
            >
              {item.name}
            </Text>
          </>
        )}
      </a>
      <div className="ml-4 flex flex-col">
        <p className="mb-4  text-secondary-tint-40">{item.name}</p>
        <div className="flex ">
          {getAttachmentType(attachmentsCombination, index) ===
          ATTACHMENT_TYPE.PREVIEW ? (
            <Chip color="amber">{t('common.preview')}</Chip>
          ) : (
            <Chip color="turquoise">{t('common.screenshot')}</Chip>
          )}
          {item?.createdAt && (
            <Chip className="ml-3" color="gray">
              {formatDate(new Date(item?.createdAt), 'yyyy-MM-dd')}
            </Chip>
          )}
        </div>
      </div>
      <IconButton
        className="absolute bottom-4 right-4"
        disabled={isDisabled}
        isLoading={isLoading}
        name="remove"
        size="sm"
        variant="ghost"
        onClick={() => handleRemoveAttachments(item)}
      />
    </div>
  );
};

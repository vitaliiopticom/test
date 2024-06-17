import React, { useState } from 'react';

import { IconButton, Modal, Separator } from '@/components/elements';
import { cx } from '@/utils/classNames';

import { DeleteVehicleImageMutationRequest } from '../../api/deleteVehicleImage';
import { CONTENT_ITEM_TYPE } from '../../constants';
import { GalleryItem } from '../../types';
import { DeleteContentConfirmModal } from '../DeleteContentConfirmModal';

import { GalleryAside, GalleryContent, GalleryHeader } from './elements';

const controlButtonStyles = 'absolute top-[40%] bg-secondary-tint-20';

type Props = {
  contentItem: GalleryItem | undefined;
  onClose: () => void;
  isOpen: boolean;
  handleNext?: () => void;
  handlePrev?: () => void;
  photosEditable?: boolean;
  vehicleId?: string;
  className?: string;
};

export const GalleryModal: React.FC<Props> = ({
  contentItem,
  handleNext,
  handlePrev,
  isOpen,
  onClose: closeGalleryModal,
  vehicleId,
  photosEditable = false,
  ...rest
}) => {
  const [deleteConfirmModal, setDeleteConfirmModal] =
    useState<DeleteVehicleImageMutationRequest>();

  if (!contentItem) {
    return null;
  }

  const isVideoContent = contentItem?.contentType === CONTENT_ITEM_TYPE.VIDEO;

  return (
    <>
      <Modal
        className="relative p-0"
        isOpen={isOpen}
        title={
          <GalleryHeader
            contentItem={contentItem}
            isVideoContent={isVideoContent}
            onClose={closeGalleryModal}
            onItemDelete={setDeleteConfirmModal}
          />
        }
        isFullScreen
        {...rest}
      >
        <Separator className="p-0" />
        <div className="flex h-full">
          <div className="relative w-3/4 bg-secondary">
            <IconButton
              className={cx(controlButtonStyles, 'left-8 mr-8')}
              name="arrowLeft"
              onClick={handlePrev}
            />
            <GalleryContent
              contentItem={contentItem}
              isVideoContent={isVideoContent}
              photosEditable={photosEditable}
            />
            <IconButton
              className={cx(controlButtonStyles, 'right-8 ml-8')}
              name="arrowRight"
              onClick={handleNext}
            />
          </div>
          <GalleryAside
            contentItem={contentItem}
            isVideoContent={isVideoContent}
          />
        </div>
      </Modal>
      <DeleteContentConfirmModal
        isOpen={!!deleteConfirmModal}
        isVideoContent={isVideoContent}
        value={deleteConfirmModal}
        onClose={() => setDeleteConfirmModal(undefined)}
        onComplete={() => {
          setDeleteConfirmModal(undefined);
          closeGalleryModal();
        }}
      />
    </>
  );
};

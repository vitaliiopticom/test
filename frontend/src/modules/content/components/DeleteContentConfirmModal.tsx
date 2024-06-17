import { FC } from 'react';

import { Text } from '@/components/elements';
import { ConfirmModal } from '@/components/shared';
import { useTranslation } from '@/i18n';

import {
  DeleteVehicleImageMutationRequest,
  useDeleteVehicleImageMutation,
} from '../api/deleteVehicleImage';
import { useDeleteVehicleVideoMutation } from '../api/deleteVehicleVideo';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  value?: DeleteVehicleImageMutationRequest;
  isVideoContent?: boolean;
};

export const DeleteContentConfirmModal: FC<Props> = ({
  isOpen,
  onClose,
  onComplete: onCompleteDeletion,
  value,
  isVideoContent,
}) => {
  const { t } = useTranslation();

  const onCompleted = () => onCompleteDeletion?.() || onClose();

  const [deleteVehicleImage, deleteVehicleImageState] =
    useDeleteVehicleImageMutation({
      onCompleted,
    });

  const [deleteVehicleVideo, deleteVehicleVideoState] =
    useDeleteVehicleVideoMutation({
      onCompleted,
    });

  const handleConfirm = () => {
    if (!value?.input) return;

    const payload = { variables: { input: value.input } };

    isVideoContent ? deleteVehicleVideo(payload) : deleteVehicleImage(payload);
  };

  const confirmModalTitleTranslation = isVideoContent
    ? t('content.deleteVideo')
    : t('content.deletePhotos');
  const deleteContentQuestionTranslation = isVideoContent
    ? t('content.deleteVideoMessage.line1')
    : t('content.deletePhotosMessage.line1', {
        count: value?.input?.length,
      });

  return (
    <ConfirmModal
      buttonTextConfirm="common.delete"
      inSubmitting={
        deleteVehicleImageState.loading || deleteVehicleVideoState.loading
      }
      isOpen={isOpen}
      title={`${confirmModalTitleTranslation} ?`}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <Text>
        {deleteContentQuestionTranslation}
        <br />
        {t('common.actionCannotBeReverted')}
      </Text>
    </ConfirmModal>
  );
};

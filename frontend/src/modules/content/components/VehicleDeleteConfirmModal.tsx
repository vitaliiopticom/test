import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from '@/components/elements';
import { ConfirmModal } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { routes } from '@/router/routesList';

import { useDeleteVehicleMutation } from '../api/deleteVehicle';
import { Vehicle } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle;
};

export const VehicleDeleteConfirmModal: FC<Props> = ({
  isOpen,
  onClose,
  vehicle,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [deleteVehicle, deleteVehicleState] = useDeleteVehicleMutation({
    onCompleted: () => {
      onClose();
      navigate(routes.content());
    },
  });

  const handleConfirm = () => {
    if (!vehicle) return;

    deleteVehicle({ variables: { input: vehicle.id } });
  };

  return (
    <ConfirmModal
      buttonTextConfirm="common.delete"
      inSubmitting={deleteVehicleState.loading}
      isOpen={isOpen}
      title={t('content.deleteVehicle')}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <Text>
        {t('content.deleteVehicleMessage.line1')}
        <br />
        {t('common.actionCannotBeReverted')}
      </Text>
    </ConfirmModal>
  );
};

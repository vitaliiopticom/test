import { FC, useCallback } from 'react';

import { Text } from '@/components/elements';
import { ConfirmModal, ConfirmModalProps } from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useRefuseCompanyContractMutation } from '../api/refuseCompanyContract';
import { useSignCompanyContractMutation } from '../api/signCompanyContract';
import { CONTRACT_ACTIONS } from '../constants';
import { UpdateContractAction } from '../types';

const actionTranslations: Record<UpdateContractAction, string> = {
  sign: 'signContractConfirmation',
  refuse: 'refuseContractConfirmation',
} as const;

export type UpdateContractConfirmModalProps = {
  type?: UpdateContractAction;
  contractId?: number;
} & Pick<ConfirmModalProps, 'isOpen' | 'onClose'>;

export const UpdateContractConfirmModal: FC<
  UpdateContractConfirmModalProps
> = ({ isOpen, onClose, contractId, type }) => {
  const { t } = useTranslation();

  const [signCompanyContract, signCompanyContractState] =
    useSignCompanyContractMutation({
      onCompleted: onClose,
    });
  const [refuseCompanyContract, refuseCompanyContractState] =
    useRefuseCompanyContractMutation({
      onCompleted: onClose,
    });

  const updateContract = useCallback(
    (contractId: number, type: UpdateContractAction) => {
      const variables = {
        variables: {
          contract: {
            id: contractId,
          },
        },
      };

      if (type === CONTRACT_ACTIONS.sign) {
        signCompanyContract(variables);
      }

      if (type === CONTRACT_ACTIONS.refuse) {
        refuseCompanyContract(variables);
      }
    },
    [refuseCompanyContract, signCompanyContract],
  );

  if (!type || !contractId) {
    return null;
  }

  const isSubmitting =
    signCompanyContractState.loading || refuseCompanyContractState.loading;

  const handleConfirm = () => updateContract(contractId, type);

  return (
    <ConfirmModal
      className="w-1/4 min-w-fit"
      inSubmitting={isSubmitting}
      isOpen={isOpen}
      title={t(`companies.${actionTranslations[type]}.title`)}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <Text>
        {t(`companies.${actionTranslations[type]}.msg`)}
        <br />
        {t('common.actionCannotBeReverted')}
      </Text>
    </ConfirmModal>
  );
};

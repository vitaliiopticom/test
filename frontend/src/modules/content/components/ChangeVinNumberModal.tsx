import React from 'react';

import { Button, Modal } from '@/components/elements';
import { Form, InputField } from '@/components/shared';
import { useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';

import { useUpdateVinNumberMutation } from '../api/updateVinNumber';
import { ChangeVinNumberFormValues, Vehicle } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  vehicle?: Vehicle;
};

export const ChangeVinNumberModal: React.FC<Props> = ({
  isOpen,
  onClose,
  vehicle,
}) => {
  const { t } = useTranslation();
  const validation = useFormValidation();

  const [updateVinNumber, updateVinNumberState] = useUpdateVinNumberMutation({
    onCompleted: () => {
      onClose();
    },
  });

  const schema = validation.schema<ChangeVinNumberFormValues>({
    vin: validation.string(),
  });

  const handleSubmit = (values: ChangeVinNumberFormValues) => {
    if (!values.vin || !vehicle) {
      return;
    }

    updateVinNumber({
      variables: {
        input: { id: vehicle?.id, vin: vehicle?.vin },
      },
    });
  };

  const defaultValues = { vin: vehicle?.vin };

  return (
    <Modal
      actions={
        <div className="flex gap-4">
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button
            form="changeVinNumber"
            isLoading={updateVinNumberState.loading}
            type="submit"
          >
            {t('common.submit')}
          </Button>
        </div>
      }
      isOpen={isOpen}
      title={t('content.changeVINNum')}
      onClose={onClose}
    >
      <div className="min-w-[400px]">
        <Form
          defaultValues={defaultValues}
          id="changeVinNumber"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <InputField name="vin" type="text" isRequired />
        </Form>
      </div>
    </Modal>
  );
};

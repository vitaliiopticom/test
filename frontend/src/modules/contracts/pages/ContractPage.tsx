import React, { FC, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Page, StepWorkflow, WorkflowStep } from '@/components/shared';
import { useFormValidation } from '@/hooks';
import { useTranslation } from '@/i18n';
import {
  useGetCompanyByIdQuery,
  useSendCompanyContractMutation,
} from '@/modules/companies';
import {
  ContractParams,
  PlatformAdministratorFormValues,
  UpdateContractSubmitValues,
} from '@/modules/contracts';
import { UpdateUserFormValues } from '@/modules/users';
import { routes } from '@/router/routesList';

import { useUpdateContractMutation } from '../api/updateContract';
import { PlatformAdministratorForm } from '../components/PlatformAdministratorForm';

const defaultValues: Partial<UpdateUserFormValues> = {
  defaultLanguageId: '',
};

export const ContractPage: FC = () => {
  const { contractId, companyId } = useParams<ContractParams>();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: companyData } = useGetCompanyByIdQuery({
    variables: { id: Number(companyId) },
  });
  const formValidation = useFormValidation();
  const [sendCompanyContract] = useSendCompanyContractMutation({
    onCompleted: () => {
      navigate(routes.companies(), { replace: true });
    },
  });
  const [updateContract, updateContractState] = useUpdateContractMutation({
    onCompleted: () => {
      const variables = {
        contract: {
          id: Number(contractId),
        },
      };

      sendCompanyContract({ variables });
    },
  });

  const { companyName = '' } = companyData?.company || {};
  const subtitle = `${t('contracts.contractFor')} ${companyName}`;

  const steps: WorkflowStep[] = useMemo(
    () => [
      {
        title: t('contracts.platformAdministrator'),
        subtitle,
        component: () => <PlatformAdministratorForm />,
        schema: formValidation
          .schema<PlatformAdministratorFormValues>({
            firstname: formValidation.string(),
            lastname: formValidation.string(),
            gender: formValidation.string(),
            email: formValidation.email(),
            defaultLanguageId: formValidation.string(),
            phoneNumber: formValidation.phoneNumber(true),
            mobileNumber: formValidation.phoneNumber(true),
          })
          .refine(
            (formValues) =>
              !!formValues.phoneNumber || !!formValues.mobileNumber,
            {
              message: t('fieldError.phoneOrMobile'),
              path: ['mobileNumber'],
            },
          ),
      },
    ],
    [subtitle, t, formValidation],
  );

  const handleSubmit = async (values: UpdateUserFormValues) => {
    if (!contractId) return;

    const submitValues: UpdateContractSubmitValues = {
      id: Number(contractId),
      platformAdministrator: {
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        mobileNumber: values.mobileNumber,
        gender: values.gender,
        defaultLanguageId: values.defaultLanguageId,
      },
      modules: ['OPTI_PIX'],
    };

    updateContract({
      variables: { updateContract: submitValues },
    });
  };

  return (
    <Page
      headerContent={<div className="font-bold">{subtitle}</div>}
      title={t('contracts.platformAdministrator')}
    >
      <StepWorkflow
        defaultValues={defaultValues}
        isSubmitting={updateContractState.loading}
        steps={steps}
        shouldSubmitAllValues
        submitOnNext
        onSubmit={handleSubmit}
      >
        <StepWorkflow.Content />
        <div className="mt-8 grid grid-cols-1 gap-7 xl:grid-cols-2">
          <StepWorkflow.Actions />
        </div>
      </StepWorkflow>
    </Page>
  );
};

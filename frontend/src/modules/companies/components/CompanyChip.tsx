import { FC } from 'react';

import { Chip } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { OnboardingStatus } from '@/modules/onboarding';

import type { ContractStatus, PhotoBoxStatus } from '../types';

type Props = {
  name?: string | null;
  onClick?: () => void;
};

type StatusConfig<T extends string = string> = Record<
  T,
  {
    label: string;
    color:
      | 'jazzberry'
      | 'blue'
      | 'orange'
      | 'green'
      | 'amber'
      | 'red'
      | 'gray'
      | 'white'
      | 'violet';
  }
>;

const optiConfig: StatusConfig = {
  //hardcoded EN + FR because currently it's what hubspot returns
  'To prospect': { label: 'companies.status.toProspect', color: 'jazzberry' },
  'A prospecter': { label: 'companies.status.toProspect', color: 'jazzberry' },

  Prospect: { label: 'companies.status.prospect', color: 'blue' },

  'Training in progress': {
    label: 'companies.status.training',
    color: 'orange',
  },

  'Client training done': {
    label: 'companies.status.trainingDone',
    color: 'amber',
  },

  Client: { label: 'companies.status.client', color: 'green' },

  'Not interested': { label: 'companies.status.notInterested', color: 'white' },
  'Pas intéressé': { label: 'companies.status.notInterested', color: 'white' },

  'Out of scope': { label: 'companies.status.outOfScope', color: 'gray' },
  'Hors scope': { label: 'companies.status.outOfScope', color: 'gray' },

  'No contact': { label: 'companies.status.noContact', color: 'gray' },
};

const contractConfig: StatusConfig<ContractStatus> = {
  NO_CONTRACT: { label: 'companies.status.NO_CONTRACT', color: 'gray' },
  SENT: { label: 'companies.status.SENT', color: 'amber' },
  SIGNED: { label: 'companies.status.SIGNED', color: 'green' },
  REFUSED: { label: 'companies.status.REFUSED', color: 'red' },
  CANCELLED: { label: 'companies.status.CANCELLED', color: 'orange' },
};

const onboardingConfig: StatusConfig<OnboardingStatus> = {
  COMPLETED: { label: 'companies.status.COMPLETED', color: 'green' },
  IN_PROGRESS: { label: 'companies.status.IN_PROGRESS', color: 'amber' },
  TO_START: { label: 'companies.status.TO_START', color: 'red' },
};

const photoBoxConfig: StatusConfig<PhotoBoxStatus> = {
  NOT_READY: { label: 'companies.status.NOT_READY', color: 'amber' },
  READY: { label: 'companies.status.READY', color: 'green' },
};

const statusConfig: StatusConfig = {
  ...optiConfig,
  ...contractConfig,
  ...onboardingConfig,
  ...photoBoxConfig,
};

export const CompanyChip: FC<Props> = ({ name, onClick }) => {
  const { t } = useTranslation();

  if (!name || !statusConfig[name]) return null;

  return (
    <Chip
      className="block min-w-[108px]"
      color={statusConfig[name].color}
      onClick={onClick}
    >
      {t(statusConfig[name].label)}
    </Chip>
  );
};

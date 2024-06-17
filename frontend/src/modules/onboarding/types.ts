import type { CreateUserFormValues } from '@/modules/users';

import { ONBOARDING_STATUS } from './constants';

export type OnboardingStatus = keyof typeof ONBOARDING_STATUS;

export type OnboardingUserFormValues = CreateUserFormValues & {
  userAlreadyInSystem?: boolean;
};

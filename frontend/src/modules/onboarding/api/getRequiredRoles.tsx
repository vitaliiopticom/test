import { gql, QueryHookOptions, useQuery } from '@/api';
import { DropDownSelectOption } from '@/types/form';

export const REQUIRED_ONBOARDING_ROLES_QUERY = gql`
  query GetRoles {
    requiredOnboardingRoles {
      id
      name
      nameLocalizationKey
    }
  }
`;

export type GetRequiredRolesQueryResponse = {
  requiredOnboardingRoles: DropDownSelectOption[];
};

export const useGetRequiredOnboardingRolesQuery = (
  options?: QueryHookOptions<GetRequiredRolesQueryResponse>,
) => {
  return useQuery<GetRequiredRolesQueryResponse>(
    REQUIRED_ONBOARDING_ROLES_QUERY,
    options,
  );
};

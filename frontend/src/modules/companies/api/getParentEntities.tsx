import { gql, QueryHookOptions, useQuery } from '@/api';
import { DropDownSelectOption } from '@/types/form';

export const PARENT_ENTITIES_QUERY = gql`
  query GetParentEntities {
    companyParentEntities {
      id
      name
    }
  }
`;

export type GetParentEntitiesQueryRequest = {};

export type GetParentEntitiesQueryResponse = {
  companyParentEntities: DropDownSelectOption[];
};

export const useGetParentEntitiesQuery = (
  options?: QueryHookOptions<
    GetParentEntitiesQueryResponse,
    GetParentEntitiesQueryRequest
  >,
) => {
  return useQuery<
    GetParentEntitiesQueryResponse,
    GetParentEntitiesQueryRequest
  >(PARENT_ENTITIES_QUERY, options);
};

import type { UsersListFiltersType } from './types';

export const usersListFiltersDefaultValues: UsersListFiltersType = {
  search: '',
  tenantId: null,
  role: {
    id: null,
    noRoles: false,
  },
};

export const USERS_DATA_VIEW_ID = 'users_data_view';

export const TENANT_ASSIGNMENTS = 'tenantAssignments';

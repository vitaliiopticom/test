import type { Permission } from '@/modules/auth';
import { DropDownSelectOption } from '@/types/form';

type UserBase = {
  id: string;
  name?: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  defaultLanguageId: string;
  mobileNumber: string;
  phoneNumber: string;
  photoUrl: string;
};

export type TenantAssignmentsInput = {
  tenantId: string;
  roleAssignments: { id: string }[];
};

export type User = UserBase & {
  tenantAssignments: {
    tenantId: string;
    roleAssignments: { id: string }[];
  }[];
};

export type UserRoleAssignment = {
  id: string;
  name: string;
  nameLocalizationKey: string;
};

export type UserTenantAssignment = {
  tenantId: string;
  name: string;
  pending: boolean;
  roleAssignments: UserRoleAssignment[];
};

export type UserResponse = UserBase & {
  tenantAssignments: UserTenantAssignment[];
};

export type ProfileTenant = {
  id: string;
  name: string;
  companyId: string;
  shouldUpdateOptipixPassword: boolean;
  validActions: Permission[];
  redirectToOnboarding: boolean;
  pending: boolean;
};

export type Profile = UserBase & {
  tenantAssignments: ProfileTenant[];
};

type UserFormValuesBase = {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  defaultLanguageId: string;
  mobileNumber: string;
  phoneNumber: string;
};

export type TenantAssignment = {
  tenantId: string;
  name: string;
  roleAssignments: string[];
};

export type CreateUserFormValues = UserFormValuesBase & {
  tenantAssignments: Omit<TenantAssignment, 'name'>[];
};

export type UpdateUserFormValues = UserFormValuesBase & {
  roleAssignments: string[];
};

export type UpdateUserWithMultipleTenantsForm = UserFormValuesBase & {
  tenantAssignments: TenantAssignment[];
};

export type UserDetailParams = {
  id: string;
};

export type ChangeOptipixPasswordFormValues = {
  password: string;
  repeatPassword: string;
};

export type RoleFilter = {
  id: UserRoleAssignment['id'] | null;
  noRoles?: boolean;
};

export type UsersListFiltersType = {
  search: string;
  tenantId: string | null;
  role?: RoleFilter;
};

export type Contact = CreateUserFormValues & { id: string; avatar: string };

export type CompanyContact = {
  contactCourtesyId: DropDownSelectOption;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactDefaultLanguage: DropDownSelectOption;
  contactJobTitle: string;
  contactPhoneNumber: string;
  contactMobilePhoneNumber: string;
  contactFunctionIds: DropDownSelectOption[];
};

export type ValidationUser = Omit<CreateUserFormValues, 'tenantAssignments'> & {
  roleAssignments: { id: string }[];
};

export type AddTenantToUserFormValues = {
  tenantId: string;
  roles: string[];
};

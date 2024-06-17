export const routes = {
  index: () => '/',
  login: () => '/login',
  audit: () => '/audit',
  auditDetail: (id: string) => `/audit/detail/${id}`,
  users: () => '/users',
  userDetail: (id: string) => `/users/detail/${id}`,
  companies: () => '/companies',
  companyDetail: (id: string) => `/companies/detail/${id}`,
  contracts: () => `/contracts`,
  contractDetail: (id: string, companyId: string) =>
    `/companies/${companyId}/contracts/${id}`,
  content: () => '/content',
  contentDetail: (id: string) => `/content/detail/${id}`,
  contentStatistics: () => '/content/statistics',
  onboarding: () => '/onboarding',
  invoicing: () => '/invoicing',
};

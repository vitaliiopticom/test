export type ContractParams = {
  contractId: string;
  companyId: string;
};

export type PlatformAdministratorFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  defaultLanguageId: string;
  mobileNumber: string;
  phoneNumber: string;
};

export type UpdateContractSubmitValues = {
  id: number;
  platformAdministrator: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    defaultLanguageId: string;
    phoneNumber: string;
    mobileNumber: string;
  };
  modules: string[];
};

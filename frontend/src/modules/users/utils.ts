import { userFormDefaultValues } from './components/UserFormFields';
import { CompanyContact, Contact } from './types';

export const createFullNameFromUser = (
  firstname?: string,
  lastname?: string,
  fallback?: string,
) => {
  if (!firstname && !lastname && fallback) {
    return fallback;
  }

  return [firstname, lastname?.toUpperCase()].filter(Boolean).join(' ');
};

export const getTenantAssignmentsByTenantId = <T extends { id: string }>(
  tenantAssignments?: T[],
  tenantId?: string,
) => {
  if (!tenantAssignments || !tenantId) return;

  return tenantAssignments.find((t) => t.id === tenantId);
};

const courtesyToGenderMap: Record<string, string> = {
  Mr: 'MALE',
  Mrs: 'FEMALE',
  'Mr.': 'MALE',
  'Mrs.': 'FEMALE',
};

const langNameToCodeMap: Record<string, string> = {
  English: 'en',
  French: 'fr',
  Spanish: 'es',
  German: 'de',
};

export const transformContactsDataToFormValues = (
  contacts: CompanyContact[] = [],
): Contact[] => {
  return contacts.map((contact) => {
    return {
      ...userFormDefaultValues,
      id: contact.contactEmail,
      firstname: contact.contactFirstName,
      lastname: contact.contactLastName,
      email: contact.contactEmail,
      phoneNumber: contact.contactPhoneNumber,
      mobileNumber: contact.contactMobilePhoneNumber,
      defaultLanguageId:
        langNameToCodeMap[contact.contactDefaultLanguage?.name],
      gender: courtesyToGenderMap[contact.contactCourtesyId?.name],
      avatar: '',
    } as Contact;
  });
};

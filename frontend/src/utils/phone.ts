import type { NationalNumber } from 'libphonenumber-js';
import { parsePhoneNumber } from 'react-phone-number-input';

export const trimLeadingZeros = (number: NationalNumber) => {
  return number?.replace(/^0+/, '');
};

export const trimLeadingZerosAfterPrefix = (phone: string) => {
  if (!phone) {
    return '';
  }

  const { countryCallingCode, nationalNumber } = parsePhoneNumber(phone) ?? {};

  return `+${countryCallingCode}${trimLeadingZeros(nationalNumber ?? '')}`;
};

export const validateByCountry = (phone: string) => {
  type CountryToValidate = 'FR';

  const { country, nationalNumber } = parsePhoneNumber(phone) ?? {};
  const countries: { [key in CountryToValidate]: boolean } = {
    FR: trimLeadingZeros(nationalNumber ?? '')?.length === 9,
  };

  return (country && countries[country as keyof typeof countries]) ?? true;
};

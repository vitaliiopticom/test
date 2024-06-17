import { forwardRef, InputHTMLAttributes } from 'react';
import Input from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';

import { Input as CustomInput } from '../Input/Input';

import { CountrySelect, SelectSizes } from './CountrySelect';

const modifiedEn = { ...en, ZZ: '' };

export type PhoneInputProps = {
  onChange: (value: string) => void;
  value?: string;
  size?: SelectSizes;
  isInvalid?: boolean;
  isEmpty?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'size'>;

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, isInvalid, isEmpty, value, onChange, size, ...rest }, _ref) => {
    return (
      <span className="relative">
        <Input
          countrySelectComponent={CountrySelect}
          countrySelectProps={{ labels: modifiedEn, size }}
          inputComponent={CustomInput}
          isEmpty={isEmpty}
          isInvalid={isInvalid}
          labels={modifiedEn}
          numberInputProps={{ className: 'pl-16', size, endIcon: 'phone' }}
          value={value}
          onChange={(value) => onChange(value || '')}
          {...rest}
        />
      </span>
    );
  },
);

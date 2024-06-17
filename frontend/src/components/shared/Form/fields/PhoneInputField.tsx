import { FC } from 'react';

import { PhoneInput, PhoneInputProps } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props = BaseFieldProps<PhoneInputProps, string>;

export const PhoneInputField: FC<Props> = ({
  rules,
  name,
  id = name,
  label,
  helperText,
  className,
  tooltip,
  isRequired,
  disabled,
  ...rest
}) => {
  return (
    <BaseField
      className={className}
      defaultValue=""
      helperText={helperText}
      id={id}
      isRequired={isRequired}
      label={label}
      name={name}
      rules={rules}
      tooltip={tooltip}
    >
      {({ controller, isInvalid, isEmpty, isFormDisabled }) => (
        <PhoneInput
          disabled={disabled || isFormDisabled}
          id={id}
          isEmpty={isEmpty}
          isInvalid={isInvalid}
          required={isRequired}
          {...controller.field}
          {...rest}
        />
      )}
    </BaseField>
  );
};

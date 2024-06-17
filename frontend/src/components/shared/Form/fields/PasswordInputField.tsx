import { FC } from 'react';

import { PasswordInput, PasswordInputProps } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props = BaseFieldProps<PasswordInputProps, string>;

export const PasswordInputField: FC<Props> = ({
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
        <PasswordInput
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

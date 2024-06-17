import { FC } from 'react';

import { Checkbox, CheckboxProps } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props = BaseFieldProps<CheckboxProps, boolean>;

export const CheckboxField: FC<Props> = ({
  rules,
  name,
  id = name,
  label,
  helperText,
  className,
  tooltip,
  isInline,
  isRequired,
  disabled,
  ...rest
}) => {
  return (
    <BaseField
      className={className}
      defaultValue={false}
      helperText={helperText}
      id={id}
      isRequired={isRequired}
      label={label}
      name={name}
      rules={rules}
      tooltip={tooltip}
      isInline
    >
      {({
        controller: {
          field: { value, ...restField },
        },
        isFormDisabled,
      }) => (
        <Checkbox
          checked={value}
          disabled={disabled || isFormDisabled}
          id={id}
          {...restField}
          {...rest}
        />
      )}
    </BaseField>
  );
};

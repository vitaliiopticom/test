import { FC } from 'react';

import { Switch, SwitchProps } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props = BaseFieldProps<SwitchProps, boolean>;

export const SwitchField: FC<Props> = ({
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
        <Switch
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

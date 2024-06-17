import { FC } from 'react';

import { CheckboxGroup, CheckboxGroupProps } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props = BaseFieldProps<CheckboxGroupProps, string[]>;

export const CheckboxGroupField: FC<Props> = ({
  rules,
  name,
  id = name,
  label,
  helperText,
  className,
  tooltip,
  isInline,
  isRequired,
  options = [],
  disabled,
  ...rest
}) => {
  return (
    <BaseField
      className={className}
      defaultValue={[]}
      helperText={helperText}
      id={id}
      isRequired={isRequired}
      label={label}
      name={name}
      rules={rules}
      tooltip={tooltip}
    >
      {({ controller, isFormDisabled }) => (
        <CheckboxGroup
          className={className}
          disabled={disabled || isFormDisabled}
          options={options}
          value={controller.field.value}
          onChange={controller.field.onChange}
          {...rest}
        />
      )}
    </BaseField>
  );
};

import { FC } from 'react';

import { RadioGroup, RadioGroupProps } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props = BaseFieldProps<RadioGroupProps, string>;

export const RadioGroupField: FC<Props> = ({
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
      defaultValue={''}
      helperText={helperText}
      id={id}
      isRequired={isRequired}
      label={label}
      name={name}
      rules={rules}
      tooltip={tooltip}
    >
      {({ controller, isFormDisabled }) => (
        <RadioGroup
          disabled={disabled || isFormDisabled}
          name={name}
          options={options}
          value={controller.field.value}
          onChange={controller.field.onChange}
          {...rest}
        />
      )}
    </BaseField>
  );
};

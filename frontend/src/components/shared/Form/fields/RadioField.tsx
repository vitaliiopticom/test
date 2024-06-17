import { FC } from 'react';

import { Radio, RadioProps } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props = BaseFieldProps<RadioProps, string>;

export const RadioField: FC<Props> = ({
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
      isInline
    >
      {({ controller, isFormDisabled }) => (
        <Radio
          disabled={disabled || isFormDisabled}
          id={id}
          {...controller.field}
          {...rest}
        />
      )}
    </BaseField>
  );
};

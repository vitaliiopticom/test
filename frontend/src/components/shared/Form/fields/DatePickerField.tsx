import { FC } from 'react';

import {
  DatePickerInput,
  DatePickerInputProps,
  DatePickerValueType,
} from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props = BaseFieldProps<DatePickerInputProps, DatePickerValueType>;

export const DatePickerField: FC<Props> = ({
  rules,
  name,
  id = name,
  label,
  helperText,
  className,
  tooltip,
  isRequired,
  isDisabled,
  ...rest
}) => {
  return (
    <BaseField
      className={className}
      defaultValue={null}
      helperText={helperText}
      id={id}
      isRequired={isRequired}
      label={label}
      name={name}
      rules={rules}
      tooltip={tooltip}
    >
      {({ controller, isInvalid, isEmpty, isFormDisabled }) => (
        <DatePickerInput
          {...controller.field}
          isDisabled={isDisabled || isFormDisabled}
          isEmpty={isEmpty}
          isInvalid={isInvalid}
          isRequired={isRequired}
          {...rest}
        />
      )}
    </BaseField>
  );
};

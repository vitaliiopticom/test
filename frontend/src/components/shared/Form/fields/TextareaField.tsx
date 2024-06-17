import { FC } from 'react';

import { Textarea, TextareaProps } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props = BaseFieldProps<TextareaProps, string>;

export const TextareaField: FC<Props> = ({
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
        <Textarea
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

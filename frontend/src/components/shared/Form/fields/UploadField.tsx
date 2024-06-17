import { Upload, UploadProps, UploadValue } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props<Multi extends boolean> = BaseFieldProps<
  UploadProps<Multi>,
  UploadValue<Multi>
>;

export const UploadField = <Multi extends boolean>({
  rules,
  name,
  id = name,
  label,
  helperText,
  isMultiple,
  className,
  tooltip,
  isRequired,
  disabled,
  ...rest
}: Props<Multi>) => {
  return (
    <BaseField
      className={className}
      defaultValue={isMultiple ? [] : null}
      helperText={helperText}
      id={id}
      isRequired={isRequired}
      label={label}
      name={name}
      rules={rules}
      tooltip={tooltip}
    >
      {({ controller, isFormDisabled }) => (
        <Upload
          disabled={disabled || isFormDisabled}
          id={id}
          isMultiple={isMultiple}
          {...controller.field}
          {...rest}
        />
      )}
    </BaseField>
  );
};

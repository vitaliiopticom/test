import { Select, SelectProps, SelectValue } from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

type Props<V, Multi extends boolean> = BaseFieldProps<
  SelectProps<V, Multi>,
  SelectValue<V, Multi>
> & { handleOnChange?: (e: SelectValue<V, Multi>) => void };

export const SelectField = <V, Multi extends boolean>({
  rules,
  name,
  id = name,
  label,
  helperText,
  isMultiple,
  options = [],
  className,
  tooltip,
  isRequired,
  handleOnChange,
  disabled,
  ...rest
}: Props<V, Multi>) => {
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
      {({ controller, isInvalid, isEmpty, isFormDisabled }) => {
        const { ref, onChange, ...field } = controller.field;

        return (
          <Select
            disabled={disabled || isFormDisabled}
            id={id}
            {...field}
            inputRef={ref}
            isEmpty={isEmpty}
            isInvalid={isInvalid}
            isMultiple={isMultiple}
            options={options}
            required={isRequired}
            onChange={(e) => {
              onChange(e);
              handleOnChange?.(e);
            }}
            {...rest}
          />
        );
      }}
    </BaseField>
  );
};

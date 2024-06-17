import {
  DataCheckboxGroup,
  DataCheckboxGroupProps,
} from '@/components/elements';
import type { OptionType } from '@/types/form';

import { BaseField, BaseFieldProps } from './BaseField';

const defaultMapper = <D,>(data: D | any) => ({
  value: data.id,
  label: data.name,
});

type Props<D> = BaseFieldProps<
  Partial<DataCheckboxGroupProps<D>>,
  OptionType<D>
>;

export type RequiredDataCheckboxGroupFieldProps<D> = Omit<
  Props<D>,
  'data' | 'mapDataToOption'
>;

export const DataCheckboxGroupField = <D,>({
  rules,
  name,
  id = name,
  label,
  helperText,
  className,
  labelClassName,
  tooltip,
  data = [],
  isRequired,
  mapDataToOption = defaultMapper,
  disabled,
  ...rest
}: Props<D>) => {
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
        <DataCheckboxGroup
          {...controller.field}
          data={data}
          disabled={disabled || isFormDisabled}
          labelClassName={labelClassName}
          mapDataToOption={mapDataToOption}
          {...rest}
        />
      )}
    </BaseField>
  );
};

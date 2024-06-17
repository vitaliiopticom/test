import {
  AutocompleteDataSelect,
  AutocompleteDataSelectProps,
  SelectValue,
} from '@/components/elements';

import { BaseField, BaseFieldProps } from './BaseField';

const defaultMapper = <D,>(data: D | any) => ({
  value: data.id,
  label: data.name,
});

type Props<D, Multi extends boolean> = BaseFieldProps<
  Partial<AutocompleteDataSelectProps<D, Multi>>,
  SelectValue<D, Multi>
> &
  Pick<AutocompleteDataSelectProps<D, Multi>, 'onQueryChange'>;

export type RequiredDataAutocompleteSelectFieldProps<
  D,
  Multi extends boolean,
> = Omit<Props<D, Multi>, 'data' | 'mapDataToOption' | 'onQueryChange'>;

export const AutocompleteDataSelectField = <D, Multi extends boolean>({
  rules,
  name,
  id = name,
  label,
  helperText,
  isMultiple,
  className,
  tooltip,
  data = [],
  isRequired,
  mapDataToOption = defaultMapper,
  disabled,
  ...rest
}: Props<D, Multi>) => {
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
      {({ controller, isInvalid, isEmpty, isFormDisabled }) => (
        <AutocompleteDataSelect
          id={id}
          {...controller.field}
          data={data}
          disabled={disabled || isFormDisabled}
          isEmpty={isEmpty}
          isInvalid={isInvalid}
          isMultiple={isMultiple}
          mapDataToOption={mapDataToOption}
          required={isRequired}
          {...rest}
        />
      )}
    </BaseField>
  );
};

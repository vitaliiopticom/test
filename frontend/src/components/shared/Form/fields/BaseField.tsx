import type { ReactNode } from 'react';
import {
  useController,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';

import { FormItem, FormItemProps } from '@/components/elements';

import { useFormDisabledContext } from '../hooks';

export type BaseFieldProps<A, V> = {
  name: UseControllerProps['name'];
  rules?: UseControllerProps['rules'];
  defaultValue?: V;
} & Omit<FormItemProps, 'children' | 'isInvalid'> &
  Partial<Omit<A, 'name'>>;

type ChildrenArgs = {
  controller: UseControllerReturn;
  isInvalid: boolean;
  isEmpty?: boolean;
  isFormDisabled?: boolean;
};

type Props<A, V> = {
  children: (args: ChildrenArgs) => ReactNode;
} & BaseFieldProps<A, V>;

export const BaseField = <A, V>({
  children,
  rules,
  name,
  id = name,
  label,
  helperText,
  defaultValue,
  className,
  labelClassName,
  tooltip,
  isInline,
  isRequired,
}: Props<A, V>) => {
  const controller = useController({ name, rules, defaultValue });
  const { disabled: isFormDisabled } = useFormDisabledContext();

  const { error, isTouched } = controller?.fieldState;
  const fieldValue = controller?.field?.value;
  const helperMessage = error?.message || helperText;

  const isInvalid = !!error;
  const isEmpty =
    (!fieldValue || !fieldValue?.length) && (isInvalid || isTouched);

  return (
    <FormItem
      className={className}
      helperText={helperMessage}
      id={id}
      isEmpty={isEmpty}
      isInline={isInline}
      isInvalid={isInvalid}
      isRequired={isRequired}
      label={label}
      labelClassName={labelClassName}
      tooltip={tooltip}
    >
      {children({ controller, isInvalid, isEmpty, isFormDisabled })}
    </FormItem>
  );
};

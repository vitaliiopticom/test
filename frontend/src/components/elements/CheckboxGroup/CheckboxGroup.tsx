import { FC, ReactNode } from 'react';

import type { OptionType } from '@/types/form';
import { cx } from '@/utils/classNames';

import { Checkbox } from '../Checkbox/Checkbox';
import { FormItem } from '../FormItem/FormItem';

const getValue = (fieldValue: string[], value: string) => {
  if (!fieldValue.includes(value)) {
    return [...fieldValue, value];
  }

  return fieldValue.filter((item) => item !== value);
};

export type CheckboxGroupProps = {
  options: OptionType[];
  value: string[];
  onChange: (values: string[]) => void;
  className?: string;
  labelClassName?: string;
  isVertical?: boolean;
  disabled?: boolean;
  render?: (item: OptionType, node: ReactNode) => ReactNode;
};

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  disabled,
  options,
  isVertical,
  className,
  labelClassName,
  value,
  onChange,
  render,
}) => {
  return (
    <div
      className={cx(
        'flex gap-2',
        isVertical ? 'flex-col' : 'flex-row flex-wrap',
        className,
      )}
    >
      {options.map((checkboxOption) => {
        const option = {
          ...checkboxOption,
          isDisabled: disabled || checkboxOption.isDisabled,
        };

        const node = (
          <FormItem
            key={option.value}
            className={className}
            label={option.label}
            labelClassName={labelClassName}
            tooltip={option.tooltip}
            isInline
          >
            <Checkbox
              checked={!!value?.includes(option.value)}
              disabled={option.isDisabled}
              onChange={() => onChange(getValue(value, option.value))}
            />
          </FormItem>
        );

        return render ? render(option, node) : node;
      })}
    </div>
  );
};

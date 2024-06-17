import { FC, ReactNode } from 'react';

import type { OptionType } from '@/types/form';
import { cx } from '@/utils/classNames';

import { FormItem } from '../FormItem/FormItem';
import { Radio } from '../Radio/Radio';

export type RadioGroupProps = {
  options: OptionType[];
  value: string;
  name: string;
  onChange: (value: string) => void;
  className?: string;
  isVertical?: boolean;
  disabled?: boolean;
  render?: (item: OptionType, node: ReactNode) => ReactNode;
};

export const RadioGroup: FC<RadioGroupProps> = ({
  options,
  isVertical,
  className,
  value,
  onChange,
  name,
  disabled,
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
      {options.map((radioOption) => {
        const option = {
          ...radioOption,
          isDisabled: disabled || radioOption.isDisabled,
        };

        const node = (
          <FormItem
            key={option.value}
            className={className}
            label={option.label}
            tooltip={option.tooltip}
            isInline
          >
            <Radio
              checked={value === option.value}
              disabled={option.isDisabled}
              name={name}
              onChange={() => onChange(option.value)}
            />
          </FormItem>
        );

        return render ? render(option, node) : node;
      })}
    </div>
  );
};

import React from 'react';
import { RadioGroup } from '@headlessui/react';

import { cx } from '@/utils/classNames';

import { IconName } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';

export type ToggleButtonOption<T extends string = string> = {
  value: T;
  icon: IconName;
  disabled?: boolean;
};

type Props<T extends string = string> = {
  value?: T;
  onChange: (value: T) => void;
  options: ToggleButtonOption<T>[];
};

export const ToggleButton = <T extends string>({
  options,
  value,
  onChange,
}: Props<T>) => {
  return (
    <RadioGroup
      className="flex divide-x divide-gray-40 overflow-hidden rounded-md border border-gray-40"
      value={value}
      onChange={onChange}
    >
      {options.map(({ value: optionValue, icon, disabled }) => {
        return (
          <RadioGroup.Option
            key={optionValue}
            disabled={disabled}
            value={optionValue}
          >
            {({ checked, disabled }) => {
              return (
                <IconButton
                  className={cx(
                    'rounded-none hover:bg-white active:bg-white',
                    checked
                      ? 'bg-white focus:bg-white'
                      : 'bg-gray-10 text-secondary-tint-70',
                  )}
                  disabled={disabled}
                  name={icon}
                  variant="ghost"
                  onClick={() => onChange(optionValue)}
                />
              );
            }}
          </RadioGroup.Option>
        );
      })}
    </RadioGroup>
  );
};

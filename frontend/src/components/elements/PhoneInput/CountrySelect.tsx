import { forwardRef, ReactElement, useMemo } from 'react';
import type { Country, Labels } from 'react-phone-number-input';
import {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input';

import { OptionType } from '@/types/form';
import { cx } from '@/utils/classNames';
import { getFlagUrlByCountryCode } from '@/utils/flags';

import { Icon } from '../Icon/Icon';
import { Select } from '../Select/Select';

const selectSizes = {
  sm: '[&_button]:h-[30px]',
  md: '[&_button]:h-[38px]',
  lg: '[&_button]:h-[46px]',
};

const flagSizes = {
  sm: 'h-[30px] ml-3',
  md: 'h-[38px] ml-3',
  lg: 'h-[46px] ml-3',
};

const placeholderFlagSizes = {
  sm: 'w-6 h-4.5 mt-2 ml-3',
  md: 'w-6 h-4.5 mt-2.5 ml-3',
  lg: 'w-6 h-4.5 mt-3.5 ml-3',
};

const noCountryCode = 'ZZ';
const internationalCode = undefined;

const priorityCountries: Country[] = ['ES', 'FR', 'DE', 'LU', 'AD', 'PT'];
const otherCountries = getCountries().filter(
  (item) => !priorityCountries.includes(item),
);

export type SelectSizes = keyof typeof selectSizes;

type CountrySelectProps = {
  value: Country;
  onChange: (value?: string) => void;
  labels: Labels;
  size?: SelectSizes;
  iconComponent?: ReactElement;
};

export const CountrySelect = forwardRef<HTMLInputElement, CountrySelectProps>(
  (
    {
      value,
      onChange,
      labels,
      size = 'md',
      iconComponent: _iconComponent,
      ...rest
    },
    ref,
  ) => {
    const options: OptionType[] = useMemo(() => {
      const sortedCountries = otherCountries.sort((a, b) =>
        (labels[a] || '').localeCompare(labels[b] || ''),
      );

      return [...priorityCountries, ...sortedCountries]
        .map((country) => ({
          label: `${labels[country]} +${getCountryCallingCode(country)}`,
          value: country,
        }))
        .concat([{ label: labels['ZZ'] ?? '', value: '' as Country }]);
    }, [labels]);
    const isPlaceholderFlag = useMemo(
      () => [noCountryCode, internationalCode].includes(value),
      [value],
    );

    return (
      <>
        <div className={cx('absolute z-10 opacity-50', selectSizes[size])}>
          <Select
            {...rest}
            ref={ref}
            className="w-[50px] border-transparent bg-transparent hover:border-transparent"
            isClearable={false}
            options={options}
            size={size}
            value={value}
            onChange={(value) => onChange(value || undefined)}
          />
        </div>
        <div className="pointer-events-none absolute z-10 w-6">
          {isPlaceholderFlag ? (
            <div
              className={cx(
                'rounded-sm border border-secondary-tint-80',
                placeholderFlagSizes[size],
              )}
            >
              <Icon className="ml-[3px] text-secondary-tint-80" name="globe" />
            </div>
          ) : (
            <img
              alt={value}
              className={cx('rounded-lg', flagSizes[size])}
              src={getFlagUrlByCountryCode(value)}
            />
          )}
        </div>
      </>
    );
  },
);

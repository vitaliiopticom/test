import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Combobox, Portal } from '@headlessui/react';

import { useDynamicWidth, useFloat } from '@/hooks';
import { useTranslation } from '@/i18n';
import type { OptionType } from '@/types/form';
import { cx } from '@/utils/classNames';

import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import { Spinner } from '../Spinner/Spinner';
import { Tooltip } from '../Tooltip/Tooltip';
import { Transition } from '../Transition/Transition';

const resetIconTop = {
  sm: 'top-0.5',
  md: 'top-1.5',
  lg: 'top-2.5',
};

export type SelectValue<
  V = string,
  Multi extends boolean = false,
> = Multi extends true ? V[] : V | null;

export type SelectProps<V = string, Multi extends boolean = false> = {
  value: SelectValue<V, Multi>;
  onChange: (value: SelectValue<V, Multi>) => void;
  options: OptionType<V>[];
  isMultiple?: Multi;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  size?: keyof typeof resetIconTop;
  isEmpty?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
  formatDisplayValue?: (label: string) => string;
  isLoading?: boolean;
  className?: string;
  isClearable?: boolean;
  wrapperClassName?: string;
  inputRef?: ForwardedRef<HTMLInputElement>;
};

const SelectInner = <V extends string = string, Multi extends boolean = false>(
  {
    value,
    onChange,
    options,
    isMultiple,
    disabled,
    name,
    size = 'md',
    isInvalid,
    formatDisplayValue,
    isLoading,
    placeholder,
    isEmpty,
    required,
    className,
    isClearable = true,
    wrapperClassName,
    inputRef,
    ...rest
  }: SelectProps<V, Multi>,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const [query, setQuery] = useState('');

  const { t } = useTranslation();
  const { getTooltipProps, setTooltipRef, setTriggerRef } = useFloat();
  const { dynamicWidthRef, dynamicWidth } = useDynamicWidth();

  const valueOption = useMemo(() => {
    if (isMultiple && Array.isArray(value)) {
      return options.filter((option) => value?.includes(option.value));
    }

    return options.find((option) => option.value === value) || null;
  }, [value, options, isMultiple]);

  const displayValue = useMemo(() => {
    if (isMultiple && Array.isArray(valueOption)) {
      return valueOption.map((option) => option.label).join(', ');
    }

    return (valueOption as OptionType<V>)?.label;
  }, [isMultiple, valueOption]);

  const filteredOptions = useMemo(() => {
    return query === ''
      ? options
      : options.filter((option) =>
          option?.label
            ?.toLowerCase()
            .replace(/\s+/g, '')
            .includes(query?.toLowerCase().replace(/\s+/g, '')),
        );
  }, [query, options]);

  const formattedValue = formatDisplayValue
    ? formatDisplayValue(displayValue)
    : displayValue;

  const inputClassName = cx(
    'pr-12 truncate font-normal text-secondary-tint-20',
    formattedValue && 'placeholder:font-medium',
    className,
  );

  const handleChange = useCallback(
    (options: OptionType | OptionType[] | null) => {
      if (!options) return onChange(isMultiple ? ([] as any) : null);

      if (isMultiple && Array.isArray(options)) {
        return onChange(
          options.map((option) => option.value) as SelectValue<V, Multi>,
        );
      }

      onChange((options as OptionType).value as SelectValue<V, Multi>);
    },
    [isMultiple, onChange],
  );

  const input = (
    <Combobox.Input
      ref={inputRef}
      as={Input}
      className={inputClassName}
      isEmpty={isEmpty}
      isInvalid={isInvalid}
      placeholder={formattedValue || placeholder}
      required={required}
      size={size}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onFocus={() => setQuery('')}
    />
  );

  return (
    <Combobox
      disabled={disabled}
      multiple={isMultiple as any}
      name={name}
      value={valueOption}
      onChange={handleChange}
      {...rest}
    >
      <div ref={dynamicWidthRef} className={cx('relative', wrapperClassName)}>
        <div ref={setTriggerRef}>
          {!!formattedValue?.length && formattedValue?.length > 25 ? (
            <Tooltip content={formattedValue}>{input}</Tooltip>
          ) : (
            input
          )}
          {displayValue && isClearable && !disabled && (
            <Button
              className={cx(
                'resetIcon absolute right-6 px-0.5 text-primary-tint-60 hover:bg-transparent hover:text-primary-tint-60',
                resetIconTop[size],
              )}
              size="sm"
              variant="ghost"
              onClick={() => {
                setQuery('');
                handleChange(null);
              }}
            >
              <Icon name="close" size={18} />
            </Button>
          )}
          <Combobox.Button
            ref={ref}
            className="absolute inset-y-0 right-0 flex items-center [&_span]:pl-1"
          >
            {isLoading && !value ? (
              <Spinner className="absolute right-2 text-gray-60" size="sm" />
            ) : (
              <span className="absolute inset-y-0 right-0 mt-1 flex items-center px-3 before:h-0 before:w-0 before:border-x-[5px] before:border-t-[6px] before:border-x-transparent before:border-t-primary-tint-60" />
            )}
          </Combobox.Button>
        </div>
        <Portal>
          <div
            ref={setTooltipRef}
            {...getTooltipProps({
              style: { width: dynamicWidth },
            })}
            className="z-tooltip"
          >
            <Transition variant="scaleOpacity">
              <Combobox.Options
                className="z-tooltip mt-1 max-h-60 w-full min-w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                static
              >
                {!filteredOptions?.length ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    {t('components.select.noOptions')}
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option.value}
                      className={({ active, disabled, selected }) =>
                        cx(
                          'relative cursor-pointer select-none py-2 pl-4 pr-10 text-secondary-tint-40',
                          selected && 'bg-gray-20',
                          active && 'text-primary-shade-40',
                          disabled && 'cursor-not-allowed bg-gray-10',
                          option.className,
                        )
                      }
                      disabled={option.isDisabled}
                      title={option.label}
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={cx(
                              'block truncate',
                              selected ? 'font-medium' : 'font-normal',
                            )}
                          >
                            {option.label}
                          </span>
                          {selected && (
                            <span
                              className={cx(
                                'absolute inset-y-0 right-0 flex items-center pr-3 text-primary',
                              )}
                            >
                              <Icon
                                aria-hidden="true"
                                className="h-5 w-5"
                                name="check"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Portal>
      </div>
    </Combobox>
  );
};

export const Select = forwardRef(SelectInner) as <
  V = string,
  Multi extends boolean = false,
>(
  props: SelectProps<V, Multi> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;

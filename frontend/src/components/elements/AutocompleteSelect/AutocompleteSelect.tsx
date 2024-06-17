import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Combobox, Portal } from '@headlessui/react';

import { useDebounce, useDynamicWidth, useFloat } from '@/hooks';
import type { OptionType } from '@/types/form';
import { cx } from '@/utils/classNames';

import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { Input } from '../Input/Input';
import type { SelectProps } from '../Select/Select';
import { Spinner } from '../Spinner/Spinner';
import { Tooltip } from '../Tooltip/Tooltip';
import { Transition } from '../Transition/Transition';

const resetIconTop = {
  sm: 'top-0.5',
  md: 'top-1.5',
  lg: 'top-2.5',
};

export type AutocompleteSelectValue<V> = OptionType<V> | OptionType<V>[];

export type AutocompleteSelectProps<
  V extends string = string,
  Multi extends boolean = false,
> = Omit<SelectProps<V, Multi>, 'value' | 'onChange'> & {
  value: AutocompleteSelectValue<V>;
  onChange: (value: AutocompleteSelectValue<V>) => void;
  onQueryChange: (query: string) => void;
  debounceInterval?: number;
};

const SelectInner = <V extends string, Multi extends boolean = false>(
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
    className,
    isClearable = true,
    wrapperClassName,
    debounceInterval,
    onQueryChange,
    ...rest
  }: AutocompleteSelectProps<V, Multi>,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } = useFloat();
  const { dynamicWidthRef, dynamicWidth } = useDynamicWidth();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, debounceInterval);

  useEffect(() => {
    if (!visible) {
      setQuery('');
    }
  }, [visible]);

  const displayValue = useMemo(() => {
    if (isMultiple && Array.isArray(value)) {
      return value.map((option) => option.label).join(', ');
    }

    return (value as OptionType<V>)?.label;
  }, [isMultiple, value]);

  const formattedValue = formatDisplayValue
    ? formatDisplayValue(displayValue)
    : displayValue;

  const inputClassName = cx(
    'pr-12 truncate',
    formattedValue && 'placeholder:text-secondary',
    className,
  );

  const handleChange = useCallback(
    (options: OptionType<V> | OptionType<V>[] | null) => {
      if (!options) return onChange(isMultiple ? ([] as any) : null);

      return onChange(options);
    },
    [isMultiple, onChange],
  );

  const input = (
    <Combobox.Input
      as={Input}
      className={inputClassName}
      isInvalid={isInvalid}
      placeholder={formattedValue || placeholder}
      size={size}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );

  const compareValues = (a: OptionType<V>, b: OptionType<V>) => {
    return a.value === b.value;
  };

  useEffect(() => {
    onQueryChange(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Combobox
      by={compareValues}
      disabled={disabled}
      multiple={isMultiple as any}
      name={name}
      value={value as OptionType<V>}
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
            {isLoading ? (
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
                {options.map((option) => (
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
                ))}
              </Combobox.Options>
            </Transition>
          </div>
        </Portal>
      </div>
    </Combobox>
  );
};

export const AutocompleteSelect = forwardRef(SelectInner) as <
  V extends string = string,
  Multi extends boolean = false,
>(
  props: AutocompleteSelectProps<V, Multi> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;

import { forwardRef, useMemo, useRef } from 'react';
import { Portal } from '@headlessui/react';

import { useDisclosure, useFloat, useOnClickOutside } from '@/hooks';
import { cx } from '@/utils/classNames';
import { endOfTheDay, formatDate, setDate } from '@/utils/date';

import { Button } from '../Button/Button';
import { DatePicker, DatePickerValueType } from '../DatePicker/DatePicker';
import { Icon } from '../Icon/Icon';
import { Input, InputProps } from '../Input/Input';
import { Transition } from '../Transition/Transition';

// use this split logic, otherwise it includes timezone in the date and the time values bugs out
const splitTime = (time: string) => {
  const [hours, minutes] = time.split(':');

  return {
    hours: hours ? Number(hours) : undefined,
    minutes: minutes ? Number(minutes) : undefined,
  };
};

const getTimeFromDate = (date: Date) => {
  const time = formatDate(date, 'HH:mm');

  return splitTime(time);
};

export type DatePickerInputProps = {
  name: string;
  value: DatePickerValueType;
  onChange: (date: DatePickerValueType | null) => void;
  isDisabled?: boolean;
  includeTime?: boolean;
  size?: InputProps['size'];
  isInvalid?: boolean;
  isEmpty?: boolean;
  setEndOfDay?: boolean;
  isClearable?: boolean;
  isRequired?: boolean;
};

export const DatePickerInput = forwardRef<
  HTMLInputElement,
  DatePickerInputProps
>(
  (
    {
      name,
      value,
      onChange,
      isDisabled,
      includeTime,
      size = 'md',
      isEmpty,
      isInvalid,
      isRequired,
      setEndOfDay,
      isClearable = true,
      ...rest
    },
    ref,
  ) => {
    const pickerModal = useDisclosure();
    const { getTooltipProps, setTooltipRef, setTriggerRef } = useFloat({
      visible: pickerModal.isOpen,
    });
    const wrapperRef = useRef<HTMLSpanElement>(null);

    useOnClickOutside(wrapperRef, () => {
      if (pickerModal.isOpen) {
        pickerModal.onClose();
      }
    });

    const handleTimeChange = (time: string) => {
      if (Array.isArray(value) || !time) return;

      const { hours, minutes } = splitTime(time);

      const newValue = setDate(value || new Date(), {
        hours,
        minutes,
      });

      onChange(newValue);
    };

    const handleDateChange = (date: DatePickerValueType | null) => {
      if (!date) {
        return onChange(null);
      }
      if (
        !includeTime ||
        !value ||
        Array.isArray(value) ||
        Array.isArray(date)
      ) {
        pickerModal.onClose();

        if (setEndOfDay) {
          const endOfDayDate = Array.isArray(date)
            ? date.map((item) => endOfTheDay(item))
            : endOfTheDay(date);
          return onChange(endOfDayDate);
        }
        return onChange(date);
      }

      const { hours, minutes } = getTimeFromDate(value);
      const newValue = setDate(date, {
        hours,
        minutes,
      });
      pickerModal.onClose();
      onChange(newValue);
    };

    const renderInputValue = useMemo(() => {
      if (!value) {
        return '';
      }

      if (Array.isArray(value)) {
        return `${formatDate(value[0])} - ${formatDate(value[1])}`;
      }

      return formatDate(value);
    }, [value]);

    return (
      <>
        <div
          ref={setTriggerRef}
          className={
            includeTime && !Array.isArray(value)
              ? 'flex items-center gap-2'
              : ''
          }
        >
          <div className="relative">
            <Input
              ref={ref}
              className="cursor-pointer"
              disabled={isDisabled}
              endIcon="calendar"
              iconClassName="cursor-pointer"
              isEmpty={isEmpty}
              isInvalid={isInvalid}
              name={name}
              required={isRequired}
              size={size}
              value={renderInputValue}
              readOnly
              onChange={() => {}}
              onClick={() => !isDisabled && pickerModal.toggle()}
              {...rest}
            />
            {value && isClearable && !isDisabled && (
              <Button
                className={cx(
                  'absolute right-9 top-0 px-0.5 text-primary-tint-60 hover:bg-transparent hover:text-primary-tint-60',
                )}
                size={size}
                variant="ghost"
                onClick={() => {
                  handleDateChange(null);
                }}
              >
                <Icon name="close" size={18} />
              </Button>
            )}
          </div>
          {includeTime && !Array.isArray(value) && (
            <Input
              size={size}
              type="time"
              value={value ? formatDate(value, 'HH:mm') : ''}
              onChange={(event) => handleTimeChange(event.target.value)}
            />
          )}
        </div>
        <Portal>
          <span ref={wrapperRef} className="relative">
            <div ref={setTooltipRef} {...getTooltipProps()}>
              <Transition show={pickerModal.isOpen} variant="scaleOpacity">
                <div>
                  <DatePicker
                    value={value}
                    onChange={handleDateChange}
                    {...rest}
                  />
                </div>
              </Transition>
            </div>
          </span>
        </Portal>
      </>
    );
  },
);

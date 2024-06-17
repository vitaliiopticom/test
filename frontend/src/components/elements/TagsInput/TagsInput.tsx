import React, {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';

import { cx } from '@/utils/classNames';

import { Chip, ChipProps } from '../Chip/Chip';
import { IconButton } from '../IconButton/IconButton';
import { getInputClassNames, sizes } from '../Input/Input';

export type TagsInputProps = {
  value: string[];
  size?: keyof typeof sizes;
  isEmpty?: boolean;
  isInvalid?: boolean;
  onChange: (value: string[]) => void;
  color?: ChipProps['color'];
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>;

export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      className,
      size = 'md',
      type = 'text',
      isEmpty,
      isInvalid,
      disabled,
      required,
      onClick,
      value,
      color = 'jazzberry',
      onChange,
      ...rest
    },
    _ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [width, setWidth] = useState(1);

    const addItem = (item: string) => {
      const newValue = [...value, item];

      if (!value.includes(inputValue)) {
        setInputValue('');
        onChange(newValue);
        setWidth(1);
      }
    };

    const removeItem = (removeItem: string) => {
      const newValue = value.filter((item) => item !== removeItem);

      onChange(newValue);
    };

    const removeLastItem = () => {
      const newValue = value.slice(0, -1);

      onChange(newValue);
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      const { key } = e;

      if (key === 'Enter' && inputValue) {
        e.preventDefault();

        addItem(inputValue);
      }
      if ((key === 'Backspace' || key === 'Delete') && !inputValue) {
        removeLastItem();
      }
    };

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setWidth(e.target.value.length || 1);
      setInputValue(e.target.value);
    };

    return (
      <div
        className={cx(
          getInputClassNames({
            size,
            isInvalid,
            className,
          }),
          'relative h-fit w-full cursor-text overflow-hidden border-gray-60 pl-0 focus-within:border-primary hover:border-black focus-within:hover:border-primary active:border-primary',
          disabled &&
            'cursor-not-allowed bg-gray-20 hover:border-gray-60 focus:border-gray-60 active:border-gray-60',
          isInvalid
            ? 'border-cerise focus-within:border-cerise hover:border-cerise hover:focus-within:border-cerise active:border-cerise'
            : 'focus-within:border-primary',
          isEmpty &&
            required &&
            'border-blaze focus-within:border-primary active:border-blaze',
        )}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <span className="flex flex-wrap items-center gap-2 pl-3">
          {value?.map((item) => (
            <Chip
              key={item}
              className="flex max-w-[120px] items-center pr-0"
              color={disabled ? 'gray' : color}
            >
              <span className="truncate">{item}</span>
              <IconButton
                disabled={disabled}
                name="close"
                size="xs"
                variant="ghost"
                onClick={() => removeItem(item)}
              />
            </Chip>
          ))}
          <input
            ref={inputRef}
            className={cx(
              'border-transparent p-0 hover:border-transparent focus:border-transparent focus:ring-0',
              disabled && 'bg-gray-20',
            )}
            disabled={disabled}
            style={{ width: `${width}ch` }}
            type={type}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            {...rest}
          />
        </span>
      </div>
    );
  },
);

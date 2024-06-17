import { forwardRef, InputHTMLAttributes } from 'react';

import { cx } from '@/utils/classNames';

const beforeStyles =
  'before:absolute before:z-5 before:content-[""] before:bg-white before:border before:transition before:ease-in-out before:rounded-full before:w-4.5 before:h-4.5 before:top-[-3px]';
const beforeCheckedStyles =
  'before:peer-checked:bg-primary before:peer-checked:border-none';
const disabledStyles =
  'bg-gray-20 before:bg-gray-40 border-gray-40 peer-checked:bg-primary-tint-90 before:peer-checked:bg-primary-tint-70';
const enabledStyles =
  'bg-gray-60 before:border-gray-90 peer-checked:bg-primary-tint-60 before:peer-checked:translate-x-4.5 after:peer-checked:translate-x-4.5';
const hoverStyles =
  'hover:after:opacity-20 hover:after:bg-gray-60 hover:after:peer-checked:bg-primary-tint-20';
const afterStyles =
  'after:absolute after:opacity-0 after:top-[-8px] after:left-[-5px] after:w-7 after:h-7 after:block after:content-[""] after:rounded-full';

export type SwitchProps = InputHTMLAttributes<HTMLInputElement>;

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, disabled, ...rest }, ref) => {
    return (
      <label className={cx('relative inline-block h-3 w-9', className)}>
        <input
          ref={ref}
          className="peer opacity-0"
          disabled={disabled}
          type="checkbox"
          {...rest}
        />
        <span
          className={cx(
            'slider round absolute inset-0 cursor-pointer rounded-[14px] transition ease-in-out',
            beforeStyles,
            beforeCheckedStyles,
            disabled ? disabledStyles : enabledStyles,
            afterStyles,
            hoverStyles,
          )}
        />
      </label>
    );
  },
);

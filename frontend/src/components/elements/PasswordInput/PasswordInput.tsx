import { forwardRef, useState } from 'react';

import { cx } from '@/utils/classNames';

import { IconButton } from '../IconButton/IconButton';
import { Input, InputProps } from '../Input/Input';

export type PasswordInputProps = InputProps;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      size = 'md',
      value,
      disabled,
      iconClassName,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible] = useState<boolean>(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          className="pr-10"
          disabled={disabled}
          size={size}
          type={visible ? 'text' : 'password'}
          {...rest}
        />
        {value && (
          <IconButton
            className={cx('absolute right-0 top-0', iconClassName)}
            disabled={disabled}
            name={visible ? 'eyeSlashed' : 'eye'}
            size={size}
            variant="transparent"
            onClick={() => setVisible(!visible)}
          />
        )}
      </div>
    );
  },
);

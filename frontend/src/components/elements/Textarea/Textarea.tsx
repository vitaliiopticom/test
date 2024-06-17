import { forwardRef, TextareaHTMLAttributes } from 'react';

import { cx } from '@/utils/classNames';

export type TextareaProps = {
  isInvalid?: boolean;
  isEmpty?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid, isEmpty, children, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cx(
          'input-base px-4 py-2.5',
          isInvalid && 'input-error',
          isEmpty && 'input-notFilled',
          className,
        )}
        {...rest}
      >
        {children}
      </textarea>
    );
  },
);

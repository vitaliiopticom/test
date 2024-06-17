import { FC, ReactNode } from 'react';

import { cx } from '@/utils/classNames';

import { HelperMessage } from './elements/HelperMessage';
import { HelperTooltip } from './elements/HelperTooltip';

const status = {
  isRequired: "after:ml-1 after:text-cerise after:content-['*']",
  isInvalid: 'text-cerise',
  isEmpty: 'text-secondary',
};

export type FormItemProps = {
  children: ReactNode;
  label?: ReactNode;
  labelClassName?: string;
  id?: string;
  isInvalid?: boolean;
  helperText?: ReactNode;
  className?: string;
  tooltip?: ReactNode;
  isInline?: boolean;
  isRequired?: boolean;
  isEmpty?: boolean;
};

export const FormItem: FC<FormItemProps> = ({
  children,
  label,
  labelClassName,
  id,
  isInvalid,
  helperText,
  className,
  tooltip,
  isInline,
  isRequired,
  isEmpty,
}) => {
  const isNotFilled = isEmpty && isRequired;

  const FormItemMessage = (
    <HelperMessage isEmpty={isNotFilled} isInvalid={isInvalid}>
      {helperText}
    </HelperMessage>
  );

  if (isInline) {
    return (
      <div className={className}>
        <div className="flex items-center">
          <label
            className={
              labelClassName ? labelClassName : 'inline-flex items-center'
            }
          >
            {children}
            {label && (
              <span
                className={cx(
                  'mx-3 items-center font-medium text-secondary',
                  isInvalid && status.isInvalid,
                  isRequired && status.isRequired,
                  isNotFilled && status.isEmpty,
                )}
              >
                {label}
              </span>
            )}
          </label>
          {tooltip && <HelperTooltip>{tooltip}</HelperTooltip>}
        </div>
        {helperText && FormItemMessage}
      </div>
    );
  }

  return (
    <div className={cx('flex flex-col', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            className={cx(
              'mb-1.5 text-sm font-semibold text-secondary',
              isInvalid && status.isInvalid,
              isRequired && status.isRequired,
              isNotFilled && status.isEmpty,
            )}
            htmlFor={id}
          >
            {label}
          </label>
          {tooltip && <HelperTooltip>{tooltip}</HelperTooltip>}
        </div>
      )}
      {children}
      {helperText && FormItemMessage}
    </div>
  );
};

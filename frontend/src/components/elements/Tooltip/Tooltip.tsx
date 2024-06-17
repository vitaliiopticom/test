import { cloneElement, FC, ReactElement, ReactNode } from 'react';
import { Portal } from '@headlessui/react';

import { FloatConfig, useFloat } from '@/hooks';
import { cx } from '@/utils/classNames';

import { Text } from '../Text/Text';

export type TooltipProps = {
  children: ReactElement;
  content: ReactNode;
  contentWrapperAs?: keyof JSX.IntrinsicElements;
  placement?: FloatConfig['placement'];
  className?: string;
};

export const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  contentWrapperAs,
  placement = 'auto',
  className,
}) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = useFloat({ trigger: 'hover', placement });

  return (
    <>
      {cloneElement(children, { ref: setTriggerRef })}
      {visible && (
        <Portal>
          <div
            ref={setTooltipRef}
            className="z-tooltip flex items-center justify-center rounded bg-secondary px-3 py-1.5 text-center text-white"
            {...getTooltipProps()}
          >
            <Text
              as={contentWrapperAs}
              className={cx('text-white', className)}
              size="sm"
              variant="bold"
            >
              {content}
            </Text>
            <div {...getArrowProps()} style={{ transform: 'rotate(45deg)' }} />
          </div>
        </Portal>
      )}
    </>
  );
};

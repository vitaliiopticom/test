import { FC, ReactNode, RefObject } from 'react';
import { Dialog } from '@headlessui/react';

import { cx } from '@/utils/classNames';

import { Card } from '../Card/Card';
import { Heading } from '../Heading/Heading';
import { IconButton } from '../IconButton/IconButton';
import { Transition } from '../Transition/Transition';

export type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
  title?: ReactNode;
  isFullScreen?: boolean;
  actions?: ReactNode;
  initialFocusRef?: RefObject<any>;
  className?: string;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  actions,
  isFullScreen,
  initialFocusRef,
  className,
}) => {
  return (
    <Transition show={isOpen}>
      <Dialog
        className="relative z-modal"
        initialFocus={initialFocusRef}
        open={isOpen}
        onClose={() => {}} //disabled closing by click outside
      >
        <Transition variant="opacity" isChild>
          <div aria-hidden="true" className="fixed inset-0 bg-secondary/25" />
        </Transition>
        <Transition variant="scaleOpacity" isChild>
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel
              as={Card}
              className={cx(
                'relative mx-auto min-w-[300px] max-w-[75%]',
                isFullScreen &&
                  'h-full w-full max-w-full overflow-hidden rounded-none',
                className,
              )}
            >
              <Dialog.Title
                as={Heading}
                className={cx('mb-6 pr-10', isFullScreen && 'my-4 pr-6')}
                variant="h3"
              >
                {title}
              </Dialog.Title>
              {onClose && (
                <IconButton
                  className="absolute right-4 top-4 bg-transparent p-0 text-secondary-tint-40 hover:bg-transparent"
                  iconClassName="h-6 w-6"
                  name="close"
                  variant="ghost"
                  onClick={onClose}
                />
              )}
              <div
                className={cx(
                  isFullScreen
                    ? 'h-full w-full'
                    : 'max-h-[70vh] overflow-y-auto',
                )}
              >
                {children}
              </div>
              {actions && (
                <div className="mt-6 flex items-center justify-end gap-4">
                  {actions}
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Transition>
      </Dialog>
    </Transition>
  );
};

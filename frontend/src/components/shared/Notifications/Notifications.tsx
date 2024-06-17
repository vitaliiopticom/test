import { FC } from 'react';
import { ToastContainer, TypeOptions } from 'react-toastify';

import { Icon, IconButton, IconName } from '@/components/elements';
import { cx } from '@/utils/classNames';

import 'react-toastify/dist/ReactToastify.min.css';
import './Notifications.css';

const contextClass = {
  success: 'bg-jade-tint-20 text-jade-shade-10',
  error: 'bg-cerise-tint-20 text-cerise-shade-10',
  info: 'bg-azure-tint-20 text-azure-shade-10',
  warning: 'bg-buttercup-tint-20 text-buttercup-shade-10',
  default: 'bg-azure-tint-20 text-azure-shade-10',
};

const contextIcon: Record<TypeOptions, IconName> = {
  success: 'circleCheck',
  error: 'circleClose',
  info: 'info',
  warning: 'circleWarning',
  default: 'question',
};

export const Notifications: FC = () => {
  return (
    <ToastContainer
      bodyClassName="text-base font-medium py-3 px-4 gap-1.5"
      className="flex flex-col gap-2"
      closeButton={({ type = 'default', closeToast }) => (
        <IconButton
          className={contextClass[type]}
          name="close"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            closeToast(e);
          }}
        />
      )}
      draggable={false}
      icon={({ type = 'default' }) => (
        <Icon className="h-6 w-6" name={contextIcon[type]} />
      )}
      position="top-right"
      toastClassName={(context) =>
        cx(
          contextClass[context?.type || 'default'],
          'shadow-md relative flex items-center min-h-10 rounded-md justify-between overflow-hidden cursor-pointer',
        )
      }
      hideProgressBar
    />
  );
};

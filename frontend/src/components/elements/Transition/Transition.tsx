import { FC, Fragment, ReactNode } from 'react';
import {
  Transition as HUITransition,
  TransitionClasses,
  TransitionEvents,
} from '@headlessui/react';

import { transitions } from './transitions';

type Props = {
  children: ReactNode;
  variant?: keyof typeof transitions;
  isChild?: boolean;
  show?: boolean;
  appear?: boolean;
} & TransitionClasses &
  TransitionEvents;

export const Transition: FC<Props> = ({
  children,
  variant,
  isChild,
  ...rest
}) => {
  const variantProps = variant ? transitions[variant] : {};
  const Tag = isChild ? HUITransition.Child : HUITransition;

  return (
    <Tag as={Fragment} {...variantProps} {...rest}>
      {children}
    </Tag>
  );
};

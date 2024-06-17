import { FC, Fragment, ReactNode } from 'react';
import { Popover as PopoverComponent, Portal } from '@headlessui/react';

import { FloatConfig, useFloat } from '@/hooks';

import { Transition } from '../Transition/Transition';

export type PopoverProps = {
  children: ReactNode;
  trigger: ReactNode;
  placement?: FloatConfig['placement'];
  offset?: FloatConfig['offset'];
};

export const Popover: FC<PopoverProps> = ({
  children,
  trigger,
  placement = 'bottom-end',
  offset = [-5, 10],
}) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef } = useFloat({
    placement,
    offset,
  });

  return (
    <div ref={setTriggerRef}>
      <PopoverComponent className="relative">
        <PopoverComponent.Button as={Fragment}>
          {trigger}
        </PopoverComponent.Button>
        <Portal>
          <div ref={setTooltipRef} {...getTooltipProps()} className="z-10">
            <Transition variant="scaleOpacity">
              <PopoverComponent.Panel className="mt-2 w-max origin-top-right shadow-lg">
                {children}
              </PopoverComponent.Panel>
            </Transition>
          </div>
        </Portal>
      </PopoverComponent>
    </div>
  );
};

import { Fragment, ReactElement, ReactNode } from 'react';
import { Menu, Portal } from '@headlessui/react';

import { FloatConfig, useFloat } from '@/hooks';
import { cx } from '@/utils/classNames';

import { Transition } from '../Transition/Transition';

type ItemProps<Item> = {
  item: Item;
  isActive: boolean;
  isDisabled: boolean;
  defaultClassName: string;
};

export type DropdownProps<Item> = {
  children: ReactNode;
  items: Item[];
  render: (args: ItemProps<Item>) => ReactElement;
  getDisabled?: (item: Item) => boolean;
  wrapperClassName?: string;
  menuClassName?: string;
  placement?: FloatConfig['placement'];
  offset?: FloatConfig['offset'];
};

export const Dropdown = <Item,>({
  children,
  items,
  render,
  wrapperClassName,
  menuClassName,
  getDisabled,
  placement,
  offset,
}: DropdownProps<Item>) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef } = useFloat({
    placement,
    offset,
  });

  return (
    <Menu as="div" className={cx('inline-block text-left', wrapperClassName)}>
      <div ref={setTriggerRef}>
        <Menu.Button as={Fragment}>{children}</Menu.Button>
      </div>
      <Portal>
        <div ref={setTooltipRef} {...getTooltipProps()} className="z-10">
          <Transition variant="scaleOpacity">
            <Menu.Items
              className={cx(
                'mt-2 w-max origin-top-right divide-y divide-gray-30 rounded bg-white text-left shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none',
                menuClassName,
              )}
              static
            >
              {items?.map((item, index) => (
                <Menu.Item key={index} disabled={getDisabled?.(item)}>
                  {({ active, disabled }) =>
                    render({
                      item,
                      isActive: active,
                      isDisabled: disabled,
                      defaultClassName: cx(
                        'flex w-full items-center justify-start p-3 text-sm',
                        active && 'bg-gray-30',
                      ),
                    })
                  }
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </div>
      </Portal>
    </Menu>
  );
};

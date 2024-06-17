import { Config, usePopperTooltip } from 'react-popper-tooltip';

export const useFloat = (config?: Config) => {
  const {
    trigger = 'click',
    placement = 'bottom-start',
    ...rest
  } = config || {};

  return usePopperTooltip({
    trigger,
    placement,
    ...rest,
  });
};

export type { Config as FloatConfig } from 'react-popper-tooltip';

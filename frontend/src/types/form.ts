import type { ReactNode } from 'react';

export type OptionType<V = string> = {
  value: V;
  label: string;
  className?: string;
  isDisabled?: boolean;
  tooltip?: ReactNode;
};

export type DropDownSelectOption = {
  id: string;
  name: string;
  nameLocalizationKey: string;
};

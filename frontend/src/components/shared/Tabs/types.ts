import { ReactNode } from 'react';

export type TabElement = {
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
};

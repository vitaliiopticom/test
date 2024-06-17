import { FC, ReactElement } from 'react';

import { FetchState, useFetchFile } from '@/hooks';

type ChildrenProps = {
  state: FetchState;
  saveFile: (
    url?: string,
    name?: string,
    onComplete?: () => void,
    onError?: () => void,
  ) => void;
  saveMultipleFiles: (
    urls: string[],
    onComplete?: () => void,
    onError?: () => void,
  ) => void;
};

type Props = {
  children: (args: ChildrenProps) => ReactElement;
  className?: string;
};

export const FetchFile: FC<Props> = ({ children, className }) => {
  const args = useFetchFile();

  return (
    <div className={className}>
      {typeof children === 'function' ? children(args) : children}
    </div>
  );
};

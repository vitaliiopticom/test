import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title?: string;
};

export const FilterGroup: FC<Props> = ({ children, title }) => {
  return (
    <div>
      {title && <div className="pb-2 font-bold">{title}</div>}
      <div className="max-xs:grid-cols-1 grid grid-cols-fill-17 items-end gap-x-6 gap-y-4">
        {children}
      </div>
    </div>
  );
};

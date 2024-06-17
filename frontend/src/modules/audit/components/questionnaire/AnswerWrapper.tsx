import { FC, ReactNode } from 'react';

import { Text } from '@/components/elements';

type AnswerWrapperProps = {
  children: ReactNode;
  evaluation?: number;
};

export const AnswerWrapper: FC<AnswerWrapperProps> = ({
  children,
  evaluation,
}) => {
  return (
    <span className="flex items-center justify-between">
      {children}
      <Text className="min-w-[1rem] text-center text-secondary-tint-50">
        {evaluation}
      </Text>
    </span>
  );
};

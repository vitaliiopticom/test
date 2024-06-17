import React from 'react';

import { cx } from '@/utils/classNames';

import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';

type Props = {
  title: string;
  description: string;
  isSelected: boolean;
  buttonLabel: string;
  onButtonClick: () => void;
};

export const SelectableCard: React.FC<Props> = ({
  title,
  description,
  isSelected,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <Card
      className={cx(
        'h-[144px] w-[370px] cursor-pointer py-4',
        isSelected && 'shadow-lg',
      )}
      isSelected={isSelected}
    >
      <div className="flex h-6 w-full items-center justify-between">
        <div
          className={cx(
            'truncate text-lg font-bold',
            isSelected && 'text-primary',
          )}
        >
          {title}
        </div>
        {isSelected ? (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
            <Icon color="white" name="check" size="15" />
          </div>
        ) : (
          <Button size="sm" variant="secondary" onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        )}
      </div>
      <div className="mt-3 line-clamp-3 text-secondary-tint-40">
        {description}
      </div>
    </Card>
  );
};

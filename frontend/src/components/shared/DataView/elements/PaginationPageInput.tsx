import { ChangeEventHandler, FC, KeyboardEventHandler, useState } from 'react';

import { Input } from '@/components/elements';
import { useUpdateEffect } from '@/hooks';

type Props = {
  currentPage: number;
  pageCount: number;
  onInputSubmit: (page: number) => void;
  isDisabled?: boolean;
};

export const PaginationPageInput: FC<Props> = ({
  isDisabled,
  currentPage,
  pageCount,
  onInputSubmit,
}) => {
  const [inputValue, setInputValue] = useState(currentPage);

  useUpdateEffect(() => {
    if (inputValue !== currentPage) {
      setInputValue(currentPage);
    }
  }, [currentPage]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (!value.match(/^[0-9]*$/)) return;

    setInputValue(Number(value));
  };

  const handleInputSubmit: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (
      event.key === 'Enter' &&
      inputValue &&
      inputValue > 0 &&
      inputValue <= pageCount
    ) {
      onInputSubmit(inputValue);
    }
  };

  return (
    <Input
      className="w-12"
      disabled={isDisabled}
      size="sm"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleInputSubmit}
    />
  );
};

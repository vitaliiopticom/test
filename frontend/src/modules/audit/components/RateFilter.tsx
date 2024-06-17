import { FC, useEffect, useState } from 'react';

import { SelectValue } from '@/components/elements';
import { SelectField, useFormContext } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { OptionType } from '@/types/form';

import { RatingKey, RATINGS } from '../constants';
import { AuditRatingFilter } from '../types';

const RATING_FIELD = 'rating';

const getOptionIdx = (options: OptionType<number>[], value: number): number =>
  options.findIndex((option) => option.value === value);

const ratingsOptions = Object.keys(RATINGS).map((ratingKey) => ({
  label: ratingKey,
  value: RATINGS[ratingKey as RatingKey],
}));

export const RateFilter: FC = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const [optionsFrom, setOptionsFrom] =
    useState<OptionType<number>[]>(ratingsOptions);
  const [optionsTo, setOptionsTo] =
    useState<OptionType<number>[]>(ratingsOptions);

  const rating: AuditRatingFilter = watch(RATING_FIELD);

  useEffect(() => {
    if (!rating?.from && !rating?.to) {
      setOptionsFrom(ratingsOptions);
      setOptionsTo(ratingsOptions);
    }
  }, [rating]);

  const handleRatingFromChange = (value: SelectValue<number>) => {
    if (!value) {
      setOptionsTo(ratingsOptions);
      return;
    }

    const idx = getOptionIdx(ratingsOptions, value);

    setOptionsTo(ratingsOptions.slice(idx + 1));
  };

  const handleRatingToChange = (value: SelectValue<number>) => {
    if (!value) {
      setOptionsFrom(ratingsOptions);
      return;
    }

    const idx = getOptionIdx(ratingsOptions, value);

    setOptionsFrom(ratingsOptions.slice(0, idx));
  };

  return (
    <div className="flex items-center">
      <SelectField<number, false>
        handleOnChange={handleRatingFromChange}
        name={`${RATING_FIELD}.from`}
        options={optionsFrom}
        placeholder={t('common.select')}
      />
      <hr className="mx-0.5 w-3 border-gray-60" />
      <SelectField<number, false>
        handleOnChange={handleRatingToChange}
        name={`${RATING_FIELD}.to`}
        options={optionsTo}
        placeholder={t(`common.${RATING_FIELD}`)}
      />
    </div>
  );
};

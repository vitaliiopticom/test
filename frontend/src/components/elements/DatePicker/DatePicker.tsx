import { forwardRef } from 'react';
import { Calendar } from '@natscale/react-calendar';
import type {
  CalendarProps,
  CalendarRef,
  Value,
} from '@natscale/react-calendar/dist/utils/types';

import { useTranslation } from '@/i18n';

import '@natscale/react-calendar/dist/main.css';
import './stylesOverride.css';

export type DatePickerValueType = Value;

export const DatePicker = forwardRef<CalendarRef, CalendarProps>(
  (props, ref) => {
    const { t } = useTranslation();

    const weekDaysLabel = {
      0: t('daysShort.su'),
      1: t('daysShort.mo'),
      2: t('daysShort.tu'),
      3: t('daysShort.we'),
      4: t('daysShort.th'),
      5: t('daysShort.fr'),
      6: t('daysShort.sa'),
    };

    const monthsLabel = {
      0: t('monthsShort.jan'),
      1: t('monthsShort.feb'),
      2: t('monthsShort.mar'),
      3: t('monthsShort.apr'),
      4: t('monthsShort.may'),
      5: t('monthsShort.june'),
      6: t('monthsShort.july'),
      7: t('monthsShort.aug'),
      8: t('monthsShort.sep'),
      9: t('monthsShort.oct'),
      10: t('monthsShort.nov'),
      11: t('monthsShort.dec'),
    };

    return (
      <Calendar
        ref={ref}
        {...props}
        monthsLabel={monthsLabel}
        weekDaysLabel={weekDaysLabel}
      />
    );
  },
);

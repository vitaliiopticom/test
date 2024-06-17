import { FC } from 'react';

import { useTranslation } from '@/i18n';

import { CardsStatistics } from '../types';

import { StatisticsCard } from './StatisticsCard';

type Props = {
  statistics?: CardsStatistics;
};

export const StatisticsCardsList: FC<Props> = ({ statistics }) => {
  const { t } = useTranslation();

  return (
    <div className="max-xs:grid-cols-1 mb-11 grid grid-cols-fill-17 gap-4">
      <StatisticsCard
        title={t('content.statisticsCardTotalVehicles')}
        value={statistics?.totalVehiclesCount}
      />
      <StatisticsCard
        title={t('content.statisticsCardActiveVehicles')}
        value={statistics?.activeVehiclesCount}
      />
      <StatisticsCard
        title={t('content.statisticsCardTotalImagesInVehicles')}
        value={statistics?.vehiclesImagesCount}
      />
      <StatisticsCard
        title={t('content.statisticsCardDeletedVehicles')}
        value={statistics?.deletedVehiclesCount}
      />
    </div>
  );
};

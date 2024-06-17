import { FC, useMemo } from 'react';

import { StyleSheet, Text, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

import type { Group, Stars } from '../../types';

import { Rating } from './Rating';

type Props = {
  auditGroups: Group[];
  companyName: string;
  rating: {
    ratingNumber: number;
    ratingMaxNumber: number;
    nationalAverage: number;
  };
};

export const Scoring: FC<Props> = ({ auditGroups, companyName, rating }) => {
  const { t } = useTranslation();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        legend: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          height: 20,
          width: 670,
          marginTop: 24,
          marginBottom: 8,
        },
        legendLine: {
          height: 8,
          width: 16,
          marginRight: 8,
          borderBottom: '2px solid #00B5C1',
        },
        legendLineDescription: {
          textAlign: 'right',
          fontFamily: 'Outfit',
          fontSize: 12,
          color: '#00B5C1',
        },

        scoringWrapper: {
          width: 617,
          marginBottom: 46,
          marginLeft: 54,
          padding: '26px 26px 0',
          borderRadius: 8,
          backgroundColor: '#F6F5F9',
        },
        feature: {
          display: 'flex',
          flexDirection: 'row',
          marginBottom: 24,
        },
        textStyle: {
          width: 250,
          fontSize: 16,
          fontFamily: 'Outfit',
          fontWeight: 600,
          color: '#20263D',
        },
        barWrapper: {
          position: 'relative',
        },
        barBase: {
          width: 320,
          height: 16,
          marginTop: 3,
          borderRadius: 8,
          backgroundColor: '#E5E3ED',
        },
        barValue: {
          position: 'absolute',
          top: 3,
          height: 16,
          backgroundColor: '#A51271',
          borderRadius: 8,
        },
        averageMark: {
          position: 'absolute',
          top: -5,
          height: 32,
          borderRight: '2px solid #00B5C1',
        },

        companyName: {
          marginLeft: 54,
          marginBottom: 12,
          fontSize: 18,
          fontFamily: 'Outfit',
          fontWeight: 600,
          color: '#20263D',
        },
        ratingWrapper: {
          display: 'flex',
          flexDirection: 'row',
          width: 350,
          marginLeft: 54,
          marginBottom: 8,
          padding: '28px 24px 24px',
          borderRadius: 8,
          backgroundColor: '#F6F5F9',
        },
        ratingTitle: {
          width: 160,
          marginTop: -4,
          fontFamily: 'Outfit',
          fontWeight: 600,
        },
        nationalAverage: {
          width: 400,
          textAlign: 'right',
          fontSize: 12,
          fontFamily: 'Outfit',
          color: '#00B5C1',
        },
      }),
    [],
  );

  const renderScore = (
    name: string,
    { score, max }: Stars,
    { score: nationalAverageScore }: Stars,
  ) => {
    const calcPercent = (value: number, maxValue: number) => {
      return `${(value / maxValue) * 100}%`;
    };

    return (
      <View key={name} style={styles.feature}>
        <Text style={styles.textStyle}>{t(`audit.report.${name}`)}</Text>
        <View style={styles.barWrapper}>
          <Text style={styles.barBase} />
          <Text style={[styles.barValue, { width: calcPercent(score, max) }]} />
          <Text
            style={[
              styles.averageMark,
              { width: calcPercent(nationalAverageScore, max) },
            ]}
          />
        </View>
      </View>
    );
  };

  const featuresKeys = [
    'harmonyOfPresentation',
    'photoQuality',
    'seriesOfPhotos',
    'hiddenCosts',
  ];

  return (
    <>
      <View style={styles.legend}>
        <Text style={styles.legendLine} />
        <Text style={styles.legendLineDescription}>
          {t('audit.report.nationalAverage')}
        </Text>
      </View>
      <View style={styles.scoringWrapper}>
        {featuresKeys.map((key, index) => {
          const values = auditGroups[index]?.rating.stars;
          const nationalAverage =
            auditGroups[index]?.nationalAverageRating.stars;

          return values && renderScore(key, values, nationalAverage);
        })}
      </View>
      <Text style={styles.companyName}>{companyName}</Text>
      <View style={styles.ratingWrapper}>
        <Text style={styles.ratingTitle}>{t('audit.report.totalScore')}</Text>
        <Rating
          ratingMaxNumber={rating.ratingMaxNumber}
          ratingNumber={rating.ratingNumber}
          size="sm"
        />
      </View>
      <Text style={styles.nationalAverage}>
        {t('audit.report.nationalAverage')} = {rating.nationalAverage}
      </Text>
    </>
  );
};

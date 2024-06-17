import { FC, useMemo } from 'react';

import { Image, StyleSheet, Text, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';
import { formatDateTime, FormatDateTimeLang } from '@/utils/date';

import { ReportDetail } from '../../types';

import { Rating } from './Rating';

type Title = {
  subtitle: string;
  subtitle2?: string;
  title?: string;
};

type Props = {
  report?: ReportDetail;
  customTitleV1?: Title;
  customTitleV2?: Title;
};

export const Cover: FC<Props> = ({ report, customTitleV1, customTitleV2 }) => {
  const { t, i18n } = useTranslation();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        coverPageImage: {
          position: 'relative',
          zIndex: 10,
          objectFit: 'cover',
          height: '100vh',
        },
        coverBorderLeft: {
          position: 'absolute',
          width: 24,
          height: '100%',
          backgroundColor: '#A51271',
        },
        coverPageLogoCaropticom: {
          position: 'absolute',
          width: 200,
          zIndex: 10,
          top: 34,
          right: 34,
        },
        coverPageOptiType: {
          position: 'absolute',
          top: 170,
          left: 100,
          textTransform: 'capitalize',
          fontSize: 32,
          fontWeight: 600,
          fontFamily: 'Outfit',
          color: '#fff',
        },
        coverPageTitle: {
          position: 'absolute',
          top: 210,
          left: 100,
          fontSize: 46,
          fontWeight: 600,
          fontFamily: 'Outfit',
          color: '#fff',
        },
        coverPageCompany: {
          position: 'absolute',
          top: 325,
          left: 96,
          fontSize: 32,
          fontWeight: 600,
          fontFamily: 'Outfit',
          color: '#fff',
        },
        coverPageRating: {
          position: 'absolute',
          top: 380,
          left: 103,
        },
        coverPageCreatedOn: {
          position: 'absolute',
          bottom: 25,
          right: 145,
          fontSize: 14,
          color: '#BCBEC5',
          fontFamily: 'Outfit',
        },
        coverPageCreatedOnValue: {
          position: 'absolute',
          bottom: 25,
          left: 703,
          fontSize: 14,
          fontFamily: 'Outfit',
          color: '#fff',
        },
        customSubtitleV1Line2: {
          position: 'absolute',
          top: 270,
          left: 100,
          fontSize: 46,
          fontWeight: 600,
          fontFamily: 'Outfit',
          color: '#fff',
        },
        customTitleV2: {
          position: 'absolute',
          top: 170,
          left: 100,
          textTransform: 'uppercase',
          fontSize: 46,
          fontWeight: 600,
          fontFamily: 'Outfit',
          color: '#fff',
        },
        customSubtitleV2: {
          position: 'absolute',
          top: 240,
          left: 100,
          fontSize: 32,
          fontWeight: 600,
          fontFamily: 'Outfit',
          color: '#fff',
        },
      }),
    [],
  );

  const coverRating = report?.rating?.stars;
  const coverRatingNumber = coverRating?.score ?? 0;
  const coverRatingMaxNumber = coverRating?.max ?? 0;

  return (
    <View>
      <Image
        src="/images/reports/background-pdf.jpg"
        style={styles.coverPageImage}
      />
      <Text style={styles.coverBorderLeft} />
      <Image
        src="/images/reports/logo_dark.png"
        style={styles.coverPageLogoCaropticom}
      />
      {customTitleV1 && (
        <>
          <Text style={styles.coverPageOptiType}>{customTitleV1.title}</Text>
          <Text style={styles.coverPageTitle}>{customTitleV1.subtitle}</Text>
          <Text style={styles.customSubtitleV1Line2}>
            {customTitleV1.subtitle2}
          </Text>
        </>
      )}
      {customTitleV2 && (
        <>
          <Text style={styles.customTitleV2}>{customTitleV2.title}</Text>
          <Text style={styles.customSubtitleV2}>{customTitleV2.subtitle}</Text>
        </>
      )}
      {report && (
        <>
          <Text style={styles.coverPageOptiType}>
            {t(`audit.type.${report.questionnaireType}`)}
          </Text>
          <Text style={styles.coverPageTitle}>
            <Text style={{ textTransform: 'uppercase' }}>
              {t(`audit.phase.${report.questionnairePhase}`)}
            </Text>{' '}
            {t('audit.report.reportPart1')}
          </Text>
          <Text style={styles.coverPageCompany}>{report.companyName}</Text>
          <View style={styles.coverPageRating}>
            <Rating
              ratingMaxNumber={coverRatingMaxNumber}
              ratingNumber={coverRatingNumber}
            />
          </View>
          <Text style={styles.coverPageCreatedOn}>{t('common.createdOn')}</Text>
          <Text style={styles.coverPageCreatedOnValue}>
            {formatDateTime(
              new Date(report.lastModified),
              'd. MMMM yyyy',
              i18n.language as FormatDateTimeLang,
            )}
          </Text>
        </>
      )}
    </View>
  );
};

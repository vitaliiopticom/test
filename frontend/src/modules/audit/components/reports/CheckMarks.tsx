import { FC, useMemo } from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';
import { Trans, useTranslation } from '@/i18n';

import { Text } from './Text';

export const CheckMarks: FC = () => {
  const { t } = useTranslation();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        contentWrapper: {
          display: 'flex',
          gap: 50,
          padding: '60px 50px 0',
          marginTop: 40,
          marginLeft: 5,
        },
        cardsWrapper: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        card: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          height: 21,
          gap: 14,
          alignItems: 'center',
        },
        label: {
          fontSize: 14,
          fontFamily: 'Outfit',
          fontWeight: 600,
          lineHeight: '1.5',
        },
        text: {
          fontSize: 12,
        },
        highlightTextLight: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#A51271',
        },
      }),
    [],
  );
  const labelKeys = [
    'vehiclePhoto',
    'descriptionPhotos',
    'onlineGlobalPresence',
    'mysteryLeads',
  ];

  const renderCheckMark = (labelKey: string) => (
    <View key={labelKey} style={styles.card}>
      <Image src="/images/reports/check.png" />
      <Text style={styles.label}>{t(`audit.report.${labelKey}`)}</Text>
    </View>
  );

  return (
    <View style={styles.contentWrapper}>
      <Text style={styles.text}>
        <Trans i18nKey="audit.report.auditAndAdviceTexts.text1">
          Transparency is an important part of any partnership. Therefore, the
          first step is to analyze your current situation. An experienced team
          verifies your online presence taking into account four essential
          points:
        </Trans>
      </Text>
      <View style={styles.cardsWrapper}>
        {labelKeys.map((labelkey) => renderCheckMark(labelkey))}
      </View>
      <Text style={styles.text}>
        <Trans i18nKey="audit.report.auditAndAdviceTexts.text2">
          This first diagnosis is then presented to you during an advisory
          meeting and the second part of the audit is completed with you. The
          end result establishes
          <Text style={styles.highlightTextLight}>the starting point</Text> for
          a potential collaboration, as well as clear Kpis to serve as the basis
          for evaluating the results in the months to come. After receiving this
          report, you can freely decide which services and software you want to
          use. Then,
          <Text style={styles.highlightTextLight}>a common strategy</Text> will
          be defined and
          <Text style={styles.highlightTextLight}>clear objectives</Text> are
          set. Often
          <Text style={styles.highlightTextLight}>an exterior view</Text> of
          one's own business is very valuable, because in everyday work the
          point of view is often different or routine sets in. Thus, the audit
          is by no means a chain of criticism, but an objective analysis of
          different points on which the success of digitization can be assessed.
          All results are justified and supported by concrete examples.
        </Trans>
      </Text>
    </View>
  );
};

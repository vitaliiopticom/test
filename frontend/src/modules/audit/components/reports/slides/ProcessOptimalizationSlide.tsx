import React from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';
import { Trans, useTranslation } from '@/i18n';

import { Header } from '../Header';
import { Text } from '../Text';

const imageSrc = '/images/reports/processOptimalization.png';

const styles = StyleSheet.create({
  flex: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  column: {
    width: '50%',
    height: '100%',
    padding: 20,
    flexDirection: 'column',
  },
  image: {
    width: 332,
    marginLeft: 48,
    marginBottom: 60,
  },
  title: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  highlightText: {
    color: '#A51271',
  },
  highlightTextLight: {
    color: '#C971AA',
  },
  textWrapper: {
    marginLeft: 50,
    width: 270,
  },
  topRightText: {
    width: 336,
    marginTop: 80,
    marginLeft: 30,
  },
  bottomRightText: {
    position: 'absolute',
    right: 40,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    width: 300,
    height: 236,
    color: '#fff',
  },
});

export const ProcessOptimalizationSlide: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.flex}>
      <View style={styles.column}>
        <Image src={imageSrc} style={styles.image} />
        <View style={styles.textWrapper}>
          <Header style={styles.title}>OPTI(PIX)</Header>
          <Header style={styles.subtitle}>
            {t('audit.report.processOptimalization')}
          </Header>
          <Text>
            <Trans i18nKey="audit.report.processOptimalizationText">
              The<Text style={styles.highlightText}>photographic process</Text>
              at the dealership is often not optimally coordinated and it can
              take days or weeks before a vehicle is finally posted online with
              photos.
            </Trans>
          </Text>
        </View>
      </View>
      <View style={styles.column}>
        <Text style={styles.topRightText}>
          <Trans i18nKey="audit.report.processOptimalizationTopRightText">
            This results in lost sales opportunities, devaluation and slower
            inventory turnover. As a rule, a car is also fully prepared before
            being photographed. At this time, it is not yet known whether the
            vehicle will be sold to an end customer or to a dealer. This is why
            sometimes too much unnecessary effort is spent on preparation, which
            lowers the margin. Moreover, the whole process is
            <Text style={styles.highlightText}>
              very time consuming and inefficient
            </Text>
            .
          </Trans>
        </Text>
        <View style={styles.bottomRightText}>
          <Text>
            <Trans i18nKey="audit.report.processOptimalizationBottomRightText">
              <Text style={styles.highlightTextLight}>Optipix</Text> is a simple
              APP that allows you to completely photograph a car
              <Text style={styles.highlightTextLight}>in 15 minutes</Text>{' '}
              without the need to have any
              <Text style={styles.highlightTextLight}>
                photography knowledge
              </Text>
              . From database to live in no time. No investment is necessary (no
              photo studio with energy-consuming light installations, no tunnel)
              and no large areas are occupied.
            </Trans>
          </Text>
        </View>
      </View>
    </View>
  );
};

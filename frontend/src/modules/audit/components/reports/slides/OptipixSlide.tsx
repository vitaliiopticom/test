import React, { useMemo } from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';
import { Trans, useTranslation } from '@/i18n';

import { Checklist } from '../Checklist';
import { Text } from '../Text';

const sideImageSrc = '/images/reports/devices.png';

const styles = StyleSheet.create({
  mainWrapper: {
    marginLeft: 54,
    marginTop: 28,
  },
  textWrapper: {
    width: 280,
    fontFamily: 'Outfit',
    marginTop: 10,
  },
  image: {
    position: 'absolute',
    top: 30,
    right: 28,
    width: 490,
  },
  listWrapper: {
    marginTop: 30,
    marginLeft: 100,
    width: '100%',
  },
  checkIcon: {
    width: 15,
    height: 15,
  },
  listItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
  highlightTextLight: {
    fontSize: 14,
    color: '#A51271',
    fontWeight: 'bold',
  },
});

export const OptipixSlide: React.FC = () => {
  const { t } = useTranslation();

  const listItems = useMemo(
    () => [
      t('audit.report.realism'),
      t('audit.report.environment'),
      t('audit.report.cleanlines'),
      t('audit.report.brightness'),
      t('audit.report.brandLogo'),
      t('audit.report.detailedEquipment'),
    ],
    [t],
  );

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>
          <Trans i18nKey="audit.report.optipixSlideText">
            <Text style={styles.highlightTextLight}>The visual elements</Text>{' '}
            determine the
            <Text style={styles.highlightTextLight}>
              first online impression
            </Text>
            . They are especially decisive when selling via one or more
            marketplaces. The customer is overwhelmed with countless product
            lines and loses the big picture. This is why it is very important
            that each ad contains real, quality and attractive photos. Here are
            some basic points to observe:
          </Trans>
        </Text>
        <View style={styles.listWrapper}>
          <Checklist items={listItems} textStyle={{ fontWeight: 'bold' }} />
        </View>
      </View>
      <Image src={sideImageSrc} style={styles.image} />
    </View>
  );
};

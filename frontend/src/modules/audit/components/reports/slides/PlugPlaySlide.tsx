import React, { useMemo } from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

import { Checklist } from '../Checklist';
import { Header } from '../Header';

const mobileDownloadImageSrc = '/images/reports/mobileDownload.png';
const imageSrc = '/images/reports/mobileOptipix.png';

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
  },
  column: {
    width: '50%',
  },
  image: {
    position: 'absolute',
    left: 165,
    top: 90,
    width: 232,
  },
  title: {
    fontSize: 50,
    width: 300,
  },
  listWrapper: {
    backgroundColor: '#fff',
    padding: 40,
    marginTop: 20,
    width: 380,
  },
  mobileDownload: {
    marginTop: 100,
    width: 200,
  },
});

export const PlugPlaySlide: React.FC = () => {
  const { t } = useTranslation();

  const items = useMemo(
    () => [
      t('audit.report.quickImplementation'),
      t('audit.report.noInvestment'),
      t('audit.report.spaceSaving'),
      t('audit.report.immediateUse'),
      t('audit.report.optimizedProcess'),
      t('audit.report.brandingIncluded'),
      t('audit.report.standardBrand'),
    ],
    [t],
  );

  return (
    <View style={styles.flex}>
      <View style={styles.column}>
        <Image src={imageSrc} style={styles.image} />
      </View>
      <View style={styles.column}>
        <Image src={mobileDownloadImageSrc} style={styles.mobileDownload} />
        <Header style={styles.title}>PLUG & PLAY PHOTO APP</Header>
        <View style={styles.listWrapper}>
          <Checklist
            items={items}
            style={{ gap: 20 }}
            textStyle={{ fontWeight: 'bold' }}
          />
        </View>
      </View>
    </View>
  );
};

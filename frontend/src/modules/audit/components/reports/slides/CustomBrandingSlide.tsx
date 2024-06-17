import React from 'react';

import { Image, StyleSheet, View } from '@/components/shared/PdfCreator';
import { useTranslation } from '@/i18n';

import { Header } from '../Header';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 39,
  },
  headerWrapper: {
    width: 350,
    position: 'absolute',
    wordWrap: 'break-word',
    left: 60,
    top: 100,
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    marginLeft: 8,
    color: '#fff',
  },
  image: {
    width: 700,
    marginTop: 100,
    marginLeft: 32,
  },
  columns: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  textFirstColumn: {
    width: '50%',
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
  textSecondColumn: {
    width: '50%',
    textAlign: 'center',
    fontSize: 18,
    color: '#A51271',
  },
  arrowImage: {
    position: 'absolute',
    top: 255,
    left: 392,
    width: 90,
    transform: 'rotate(-55deg)',
  },
});

const imageSrc = '/images/reports/carBeforeAfter.png';
const arrowImageSrc = '/images/reports/arrowArc.png';

export const CustomBrandingSlide: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Header style={styles.header}>
          {t('audit.report.customBranding')}
        </Header>
      </View>
      <Image src={imageSrc} style={styles.image} />
      <Image src={arrowImageSrc} style={styles.arrowImage} />
      <View style={styles.columns}>
        <Header style={styles.textFirstColumn}>{t(`common.before`)}</Header>
        <Header style={styles.textSecondColumn}>{t(`common.after`)}</Header>
      </View>
    </View>
  );
};
